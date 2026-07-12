(() => {
  const demo = {
    index: 0,
    timer: null,
    stages: [],
    exercise: null,
    voice: true,
    sound: true,
    audioCtx: null,
    stopped: false
  };

  function byId(id) { return document.getElementById(id); }

  function initUpgrade() {
    demo.exercise = typeof exercises !== "undefined" ? exercises[0] : null;
    installAvatarBindings();
    installDemoControls();
    installCardDemoInterceptor();
    document.addEventListener("visibilitychange", () => { if (document.hidden) stopDemo(false); });
    window.addEventListener("beforeunload", () => stopDemo(false));
    if (demo.exercise) selectExercise(demo.exercise, false);
  }

  function installAvatarBindings() {
    [["avatarNeutralBtn", "neutral"], ["avatarMaleBtn", "male"], ["avatarFemaleBtn", "female"]].forEach(([id, avatar]) => {
      const btn = byId(id);
      if (!btn) return;
      btn.addEventListener("click", () => {
        if (typeof state !== "undefined") state.avatar = avatar;
        document.querySelectorAll(".seg").forEach(item => item.classList.remove("active"));
        btn.classList.add("active");
        selectExercise(demo.exercise || exercises[0], false);
      });
    });
  }

  function installDemoControls() {
    byId("playDemoBtn")?.addEventListener("click", () => playDemo(demo.exercise || exercises[0], false));
    byId("pauseDemoBtn")?.addEventListener("click", () => pauseDemo());
    byId("stopDemoBtn")?.addEventListener("click", () => stopDemo(true));
    byId("replayDemoBtn")?.addEventListener("click", () => playDemo(demo.exercise || exercises[0], true));
    byId("voiceToggleBtn")?.addEventListener("click", toggleVoice);
    byId("soundToggleBtn")?.addEventListener("click", toggleSound);
  }

  function installCardDemoInterceptor() {
    const grid = byId("exerciseGrid");
    if (!grid) return;
    grid.addEventListener("click", event => {
      const btn = event.target.closest("[data-demo]");
      if (!btn) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      const ex = exercises.find(item => item.name === btn.dataset.demo);
      if (!ex) return;
      playDemo(ex, true);
      byId("demoCoach")?.scrollIntoView({behavior: "smooth", block: "start"});
    }, true);
  }

  function selectExercise(exercise, speak) {
    pauseDemo(false);
    demo.stopped = false;
    demo.exercise = exercise;
    demo.index = 0;
    demo.stages = buildStages(exercise);
    byId("demoName").textContent = exercise.name;
    byId("demoPattern").textContent = `${exercise.pattern.replace("-", " ")} pattern`;
    renderTimeline();
    showStage(0, speak);
  }

  function playDemo(exercise, replay) {
    if (replay || exercise !== demo.exercise) selectExercise(exercise, false);
    demo.stopped = false;
    pauseDemo(false);
    setStageCardStopped(false);
    showStage(demo.index || 0, true);
    demo.timer = window.setInterval(() => {
      showStage((demo.index + 1) % demo.stages.length, true);
    }, 3600);
    const btn = byId("playDemoBtn");
    if (btn) btn.textContent = "Demo playing";
  }

  function pauseDemo(updateButton = true) {
    if (demo.timer) {
      clearInterval(demo.timer);
      demo.timer = null;
    }
    byId("avatarStage")?.classList.remove("is-playing");
    if (updateButton && byId("playDemoBtn")) byId("playDemoBtn").textContent = "Play guided demo";
    cancelSpeech();
  }

  function stopDemo(showMessage = true) {
    pauseDemo(false);
    demo.stopped = true;
    cancelSpeech();
    stopSoundNow();
    demo.index = 0;
    const stage = byId("avatarStage");
    if (stage && demo.exercise) {
      const avatar = typeof state !== "undefined" ? state.avatar : "neutral";
      stage.className = `avatar-stage pattern-${demo.exercise.pattern} avatar-${avatar} stage-0 is-stopped`;
    }
    const btn = byId("playDemoBtn");
    if (btn) btn.textContent = "Play guided demo";
    byId("demoStageBadge").textContent = demo.stages.length ? `Stage 1 of ${demo.stages.length}` : "Stopped";
    document.querySelectorAll("#stageTimeline li").forEach((li, index) => li.classList.toggle("active", index === 0));
    setStageCardStopped(true);
    if (showMessage) {
      byId("stageLabel").textContent = "Stopped";
      byId("stageTitle").textContent = "Demo and voice stopped";
      byId("stageCue").textContent = "Press Play guided demo or choose another exercise to start again.";
      byId("stageComment").textContent = "All timers, spoken coaching and cue sounds have been cancelled.";
    }
  }

  function setStageCardStopped(isStopped) {
    document.querySelector(".stage-card")?.classList.toggle("is-stopped", isStopped);
    byId("avatarStage")?.classList.toggle("is-stopped", isStopped);
  }

  function cancelSpeech() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  function stopSoundNow() {
    try {
      if (demo.audioCtx && demo.audioCtx.state === "running") demo.audioCtx.suspend();
    } catch (error) {
      console.warn("Audio stop unavailable", error);
    }
  }

  function toggleVoice() {
    demo.voice = !demo.voice;
    const btn = byId("voiceToggleBtn");
    if (!btn) return;
    btn.textContent = demo.voice ? "Voice on" : "Voice off";
    btn.setAttribute("aria-pressed", String(demo.voice));
    btn.classList.toggle("voice-off", !demo.voice);
    if (!demo.voice) cancelSpeech();
  }

  function toggleSound() {
    demo.sound = !demo.sound;
    const btn = byId("soundToggleBtn");
    if (!btn) return;
    btn.textContent = demo.sound ? "Sound on" : "Sound off";
    btn.setAttribute("aria-pressed", String(demo.sound));
    btn.classList.toggle("sound-off", !demo.sound);
    if (!demo.sound) stopSoundNow();
  }

  function buildStages(exercise) {
    const defaultStages = {
      squat: ["Stand tall and set the feet.", "Send the hips back and lower.", "Pause at a comfortable depth.", "Press through the whole foot to stand."],
      lunge: ["Stand tall and find balance.", "Step one foot back softly.", "Bend both knees only as far as comfortable.", "Push through the front foot and return."],
      bridge: ["Lie on your back with knees bent.", "Brace gently before you lift.", "Lift hips without arching the back.", "Lower with control and reset."],
      push: ["Set the hands and create a long line.", "Lower slowly with relaxed shoulders.", "Pause before form changes.", "Press back up with steady breath."],
      plank: ["Set your support position.", "Brace gently and lengthen the body.", "Hold only while breathing stays calm.", "Lower or reset before form breaks."],
      deadbug: ["Lie on your back and prepare.", "Lower opposite arm and leg slowly.", "Keep the trunk quiet and controlled.", "Return to centre and switch sides."],
      balance: ["Stand near support and get tall.", "Lift one foot or reach carefully.", "Hold steady without forcing range.", "Return smoothly and repeat the other side."],
      cardio: ["Start tall at an easy pace.", "Move one side with rhythm.", "Switch sides while keeping control.", "Settle back to easy breathing."],
      stretch: ["Start in a comfortable position.", "Move gently into the first range.", "Pause and breathe without forcing.", "Return or switch sides slowly."],
      inchworm: ["Stand tall with soft knees.", "Fold forward and walk hands out.", "Find a controlled plank shape.", "Walk back carefully and stand."],
      burpee: ["Stand with space around you.", "Hinge or squat to place hands down.", "Step into plank one foot at a time.", "Step forward and stand tall."],
      calf: ["Stand near support.", "Rise onto the balls of the feet.", "Pause briefly at the top.", "Lower slowly through the whole foot."],
      row: ["Lie face down and set the arms.", "Lift gently from the upper back.", "Pause without shrugging.", "Lower slowly and reset."]
    }[exercise.pattern] || ["Set up safely.", "Move slowly.", "Pause with control.", "Return and reset."];

    return ["Setup", "Move", "Control", "Return"].map((label, i) => ({
      label,
      title: defaultStages[i],
      cue: exercise.instructions[i] || defaultStages[i],
      comment: i === 0
        ? `Target areas: ${exercise.targets.join(", ")}. ${exercise.description}`
        : i === 1
          ? `Technique comment: ${exercise.cues[0] || "Move with control and keep breathing."}`
          : i === 2
            ? `Avoid rushing, forcing range, or ignoring discomfort. Gentler option: ${exercise.easier}`
            : `Finish with control. Benefit: ${exercise.benefits}`
    }));
  }

  function renderTimeline() {
    const timeline = byId("stageTimeline");
    if (!timeline) return;
    timeline.innerHTML = demo.stages.map((stage, index) => `<li data-step="${index + 1}">${stage.label}: ${stage.title}</li>`).join("");
  }

  function showStage(index, speak) {
    if (!demo.stages.length || !demo.exercise) return;
    demo.stopped = false;
    setStageCardStopped(false);
    demo.index = ((index % demo.stages.length) + demo.stages.length) % demo.stages.length;
    const stageData = demo.stages[demo.index];
    const avatar = typeof state !== "undefined" ? state.avatar : "neutral";
    const stage = byId("avatarStage");
    if (stage) stage.className = `avatar-stage pattern-${demo.exercise.pattern} avatar-${avatar} stage-${demo.index}${demo.timer ? " is-playing" : ""}`;
    byId("demoStageBadge").textContent = `Stage ${demo.index + 1} of ${demo.stages.length}`;
    byId("stageLabel").textContent = stageData.label;
    byId("stageTitle").textContent = stageData.title;
    byId("stageCue").textContent = stageData.cue;
    byId("stageComment").textContent = stageData.comment;
    document.querySelectorAll("#stageTimeline li").forEach((li, i) => li.classList.toggle("active", i === demo.index));
    if (speak) {
      cueTone(demo.index);
      speakStage(stageData, demo.index);
    }
  }

  function speakStage(stageData, index) {
    if (!demo.voice || !window.speechSynthesis || demo.stopped) return;
    cancelSpeech();
    const text = `${stageData.label}. ${stageData.title}. ${stageData.cue}. ${stageData.comment}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = index === 2 ? 0.9 : 1;
    utterance.volume = 0.88;
    window.speechSynthesis.speak(utterance);
  }

  async function cueTone(index) {
    if (!demo.sound || demo.stopped) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!demo.audioCtx) demo.audioCtx = new AudioContext();
      const ctx = demo.audioCtx;
      if (ctx.state === "suspended") await ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 430 + index * 75;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.24);
    } catch (error) {
      console.warn("Audio cue unavailable", error);
    }
  }

  initUpgrade();
})();
