(() => {
  "use strict";

  /* The content lives in roadmap-data.js. Fail loudly if it is missing. */
  if (typeof GUIDE === "undefined" || typeof ROADMAP === "undefined") {
    const root = document.getElementById("roadmap");
    if (root) root.textContent = "Roadmap data did not load. Check that js/roadmap-data.js exists.";
    return;
  }

  const STORE_KEY = "cp-roadmap-v2";
  const REVIEW_DAYS = [3, 7, 21]; // re-solve schedule after a topic is finished
  const REVIEWS_SHOWN = 4;
  const DAY_MS = 86400000;

  /* ---------- tiny DOM helpers ------------------------------------------- */
  const node = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined && text !== null) element.textContent = text;
    return element;
  };

  const externalLink = (item) => {
    const link = node("a", "", item.label || item.name || item.url);
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  };

  const listItemLink = (item) => {
    const li = node("li");
    li.append(externalLink(item));
    return li;
  };

  const phaseLabel = (phase) => phase.split(":")[0];
  const phaseTitle = (phase) => (phase.includes(":") ? phase.slice(phase.indexOf(":") + 1).trim() : phase);

  /* ---------- flatten the roadmap once ---------------------------------- */
  const topics = [];
  ROADMAP.forEach((phase, phaseIndex) => {
    phase.topics.forEach((topic) => {
      topics.push({ topic, phase, phaseIndex, number: topics.length + 1 });
    });
  });

  const topicIndex = new Map(topics.map((entry) => [entry.topic.id, entry]));
  const totalProblems = topics.reduce((sum, entry) => sum + entry.topic.practice.length, 0);

  const topicRefs = new Map();
  const phaseRefs = [];

  /* ---------- saved progress -------------------------------------------- */
  const state = {
    done: new Set(),      // topic ids
    solved: new Set(),    // problem ids, e.g. "t03-p2"
    reviews: new Map()    // topic id -> { stage, due: "YYYY-MM-DD" }
  };

  const pad = (value) => String(value).padStart(2, "0");
  const toISO = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const fromISO = (iso) => {
    const [year, month, day] = iso.split("-").map(Number);
    return new Date(year, month - 1, day);
  };
  const todayISO = () => toISO(new Date());
  const addDays = (iso, days) => {
    const date = fromISO(iso);
    date.setDate(date.getDate() + days);
    return toISO(date);
  };
  const daysUntil = (iso) => Math.round((fromISO(iso) - fromISO(todayISO())) / DAY_MS);

  function loadState() {
    let raw = null;
    try {
      raw = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
    } catch (_) {
      return; // unreadable storage: start fresh rather than break the page
    }
    if (!raw || typeof raw !== "object") return;

    if (Array.isArray(raw.done)) {
      raw.done.forEach((id) => { if (topicIndex.has(id)) state.done.add(id); });
    }
    if (Array.isArray(raw.solved)) {
      raw.solved.forEach((id) => { if (typeof id === "string") state.solved.add(id); });
    }
    if (raw.reviews && typeof raw.reviews === "object") {
      Object.entries(raw.reviews).forEach(([id, value]) => {
        if (!state.done.has(id) || !value || typeof value !== "object") return;
        if (!Number.isInteger(value.stage) || value.stage >= REVIEW_DAYS.length) return;
        const due = typeof value.due === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value.due) ? value.due : todayISO();
        state.reviews.set(id, { stage: value.stage, due });
      });
    }
  }

  function saveState() {
    const data = {
      version: 2,
      done: [...state.done],
      solved: [...state.solved],
      reviews: Object.fromEntries(state.reviews)
    };
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(data));
    } catch (_) {
      // Storage can be blocked or full. The page keeps working, it just cannot remember.
    }
  }

  /* ---------- rendering: guide and subnav -------------------------------- */
  function renderGuide() {
    const list = document.getElementById("guide-list");
    if (!list) return;
    GUIDE.forEach((text) => list.append(node("li", "", text)));
  }

  function renderSubnav() {
    const links = document.getElementById("subnav-links");
    if (!links) return;
    ROADMAP.forEach((phase, index) => {
      const link = node("a", "subnav-link", phase.short);
      link.href = `#phase-${index + 1}`;
      links.append(link);
    });
  }

  /* ---------- rendering: topic body parts -------------------------------- */
  function buildColumns(topic, ref) {
    const columns = node("div", "cols");

    const learnCol = node("div", "col");
    learnCol.append(node("h3", "label", "What to learn"));
    const subtopics = node("ul");
    (topic.subtopics || []).forEach((text) => subtopics.append(node("li", "", text)));
    learnCol.append(subtopics);

    if (topic.learn && topic.learn.length) {
      learnCol.append(node("h3", "label", "Learn"));
      const links = node("ul", "links");
      topic.learn.forEach((item) => links.append(listItemLink(item)));
      learnCol.append(links);
    }

    const practiceCol = node("div", "col");
    const count = node("span", "count");
    const practiceLabel = node("h3", "label", "Practice");
    practiceLabel.append(document.createTextNode(" · "), count);
    practiceCol.append(practiceLabel);
    ref.count = count;

    const practice = node("ol", "practice");
    (topic.practice || []).forEach((item, index) => {
      const problemId = `${topic.id}-p${index + 1}`;
      const row = node("li", "p-item");

      const main = node("span", "p-main");
      main.append(node("span", "tag", item.site));
      const link = node("a", "", item.name);
      link.href = item.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      main.append(link);

      const box = node("input", "pcheck");
      box.type = "checkbox";
      box.dataset.id = problemId;
      box.setAttribute("aria-label", `Solved: ${item.name}`);

      row.append(main, box);
      practice.append(row);
      ref.problems.push({ id: problemId, box, row });
    });

    practiceCol.append(practice);
    columns.append(learnCol, practiceCol);
    return columns;
  }

  function buildRecall(topic) {
    if (!topic.recall || !topic.recall.length) return null;

    const box = node("div", "recall");
    box.append(node("h3", "label", "Recall check"));
    box.append(node("p", "hint", "Answer each question out loud before you start the problems. Open it only to check yourself."));

    topic.recall.forEach((item) => {
      const qa = node("details", "qa");
      qa.append(node("summary", "", item.q), node("p", "", item.a));
      box.append(qa);
    });

    return box;
  }

  function buildFacts(topic) {
    const facts = node("dl", "facts");
    const addFact = (label, value, className) => {
      if (!value) return;
      const row = node("div", className || "");
      row.append(node("dt", "", label), node("dd", "", value));
      facts.append(row);
    };

    addFact("Done when", topic.doneWhen, "done-when");
    addFact("Common mistake", topic.mistake);
    addFact("Tip", topic.tip, "tip");

    return facts.children.length ? facts : null;
  }

  /* ---------- rendering: roadmap ---------------------------------------- */
  function renderRoadmap() {
    const root = document.getElementById("roadmap");
    if (!root) return;

    ROADMAP.forEach((phase, phaseIndex) => {
      const phaseId = `phase-${phaseIndex + 1}`;
      const section = node("section", "phase wrap");
      section.id = phaseId;
      section.setAttribute("aria-labelledby", `${phaseId}-title`);

      const side = node("div", "phase-side");
      side.append(node("p", "label phase-label", phaseLabel(phase.phase)));
      const meta = node("p", "phase-meta");
      const daysMeta = node("span");
      const doneMeta = node("span");
      meta.append(daysMeta, doneMeta);
      side.append(meta);

      const bar = node("div", "bar");
      bar.setAttribute("role", "progressbar");
      bar.setAttribute("aria-label", `${phaseLabel(phase.phase)} topics completed`);
      bar.setAttribute("aria-valuemin", "0");
      bar.setAttribute("aria-valuemax", "100");
      bar.setAttribute("aria-valuenow", "0");
      const fill = node("span");
      bar.append(fill);
      side.append(bar);

      const badge = node("span", "phase-done", "Phase complete");
      side.append(badge);

      const main = node("div", "phase-main");
      const heading = node("h2", "", phaseTitle(phase.phase));
      heading.id = `${phaseId}-title`;
      const topicBox = node("div", "topics");
      main.append(heading, node("p", "goal", phase.goal), topicBox);

      phase.topics.forEach((topic) => {
        const entry = topicIndex.get(topic.id);
        const ref = { article: null, checkbox: null, count: null, problems: [] };

        const article = node("article", "topic");
        article.id = topic.id;
        ref.article = article;

        const hit = node("label", "hit");
        const checkbox = node("input", "check");
        checkbox.type = "checkbox";
        checkbox.dataset.id = topic.id;
        checkbox.setAttribute("aria-label", `Mark topic ${entry.number} done: ${topic.title}`);
        hit.append(checkbox);
        ref.checkbox = checkbox;
        article.append(hit);

        const details = node("details");
        const summary = node("summary");
        summary.append(
          node("span", "num", String(entry.number).padStart(2, "0")),
          node("span", "title", topic.title),
          node("span", "days", `${topic.days} ${topic.days === 1 ? "day" : "days"}`)
        );
        details.append(summary);

        const body = node("div", "body");
        const head = node("div", "topic-head");
        head.append(node("p", "summary", topic.summary));
        if (topic.prereq && topic.prereq !== "None") {
          head.append(node("p", "prereq", `Prerequisites: ${topic.prereq}`));
        }
        body.append(head);
        body.append(buildColumns(topic, ref));

        const recall = buildRecall(topic);
        if (recall) body.append(recall);

        const facts = buildFacts(topic);
        if (facts) body.append(facts);

        details.append(body);
        article.append(details);
        topicBox.append(article);
        topicRefs.set(topic.id, ref);
      });

      if (phase.checkpoint) {
        const checkpoint = node("aside", "checkpoint");
        checkpoint.append(node("p", "label", "Mixed check"));
        checkpoint.append(node("p", "checkpoint-rule", phase.checkpoint.rule));
        const problems = node("ul", "links");
        phase.checkpoint.problems.forEach((item) => problems.append(listItemLink(item)));
        checkpoint.append(problems);
        main.append(checkpoint);
      }

      if (phase.milestone) {
        const milestone = node("aside", "milestone");
        milestone.append(node("p", "label", "Milestone"));
        milestone.append(node("p", "", phase.milestone));
        main.append(milestone);
      }

      section.append(side, main);
      root.append(section);
      phaseRefs.push({ phase, daysMeta, doneMeta, bar, fill, badge });
    });
  }

  /* ---------- the "Today" cards ----------------------------------------- */
  function dueReviews() {
    const today = todayISO();
    return [...state.reviews.entries()]
      .filter(([id, review]) => state.done.has(id) && review.due <= today)
      .sort((a, b) => a[1].due.localeCompare(b[1].due))
      .map(([id, review]) => ({ topic: topicIndex.get(id).topic, review }));
  }

  function dueLabel(iso) {
    const days = daysUntil(iso);
    if (days < 0) return `overdue by ${-days} ${days === -1 ? "day" : "days"}`;
    if (days === 0) return "due today";
    return `in ${days} days`;
  }

  function nextReviewHint() {
    const upcoming = [...state.reviews.entries()]
      .filter(([id]) => state.done.has(id))
      .sort((a, b) => a[1].due.localeCompare(b[1].due))[0];

    if (!upcoming) {
      return "No reviews yet. Finish a topic and it comes back here 3, 7 and 21 days later for a short re-solve.";
    }

    const [id, review] = upcoming;
    const days = daysUntil(review.due);
    const when = days <= 0 ? "today" : days === 1 ? "tomorrow" : `in ${days} days`;
    return `Nothing due today. Next re-solve: ${topicIndex.get(id).topic.title}, ${when}.`;
  }

  function renderNext() {
    const card = document.getElementById("next-card");
    if (!card) return;

    card.replaceChildren();
    card.append(node("p", "label", "Next up"));

    const next = topics.find((entry) => !state.done.has(entry.topic.id));
    if (!next) {
      card.append(
        node("h3", "card-title", "Every topic is marked done"),
        node("p", "card-text", "Keep the review queue clear, take contests regularly, and upsolve every problem you miss.")
      );
      return;
    }

    const tags = node("p", "card-tags");
    [phaseLabel(next.phase.phase), `Topic ${next.number} of ${topics.length}`, `${next.topic.days} days`].forEach((text) => {
      tags.append(node("span", "chip", text));
    });

    card.append(
      tags,
      node("h3", "card-title", next.topic.title),
      node("p", "card-text", next.topic.summary)
    );

    const open = node("a", "btn btn-small", "Open this topic");
    open.href = `#${next.topic.id}`;
    open.dataset.open = next.topic.id;
    card.append(open);
  }

  function renderReviews() {
    const card = document.getElementById("review-card");
    if (!card) return;

    card.replaceChildren();
    card.append(node("p", "label", "Review queue"));

    const due = dueReviews();
    if (!due.length) {
      card.append(node("p", "card-text", nextReviewHint()));
      return;
    }

    card.append(node("p", "card-text", "Re-solve two problems from each topic below, from an empty file, then mark it done."));

    const list = node("ul", "review-list");
    due.slice(0, REVIEWS_SHOWN).forEach(({ topic, review }) => {
      const row = node("li", "review-row");
      const info = node("div");
      info.append(
        node("p", "review-title", topic.title),
        node("p", "review-meta", `Review ${review.stage + 1} of ${REVIEW_DAYS.length} · ${dueLabel(review.due)}`)
      );
      const button = node("button", "btn btn-small btn-ghost", "Re-solved");
      button.type = "button";
      button.dataset.review = topic.id;
      row.append(info, button);
      list.append(row);
    });
    card.append(list);

    if (due.length > REVIEWS_SHOWN) {
      card.append(node("p", "card-meta", `and ${due.length - REVIEWS_SHOWN} more due.`));
    }
  }

  /* ---------- refresh everything derived from state ---------------------- */
  function refresh() {
    let totalDays = 0;
    let doneTopics = 0;
    let solvedProblems = 0;

    topicRefs.forEach((ref, id) => {
      const entry = topicIndex.get(id);
      totalDays += entry.topic.days;

      const isDone = state.done.has(id);
      if (isDone) doneTopics += 1;
      ref.article.classList.toggle("is-done", isDone);
      if (ref.checkbox.checked !== isDone) ref.checkbox.checked = isDone;

      let solvedHere = 0;
      ref.problems.forEach(({ id: problemId, box, row }) => {
        const solved = state.solved.has(problemId);
        if (solved) solvedHere += 1;
        row.classList.toggle("is-solved", solved);
        if (box.checked !== solved) box.checked = solved;
      });
      ref.count.textContent = `${solvedHere} of ${ref.problems.length} solved`;
      solvedProblems += solvedHere;
    });

    phaseRefs.forEach(({ phase, daysMeta, doneMeta, bar, fill, badge }) => {
      const days = phase.topics.reduce((sum, topic) => sum + topic.days, 0);
      const done = phase.topics.filter((topic) => state.done.has(topic.id)).length;
      const percent = Math.round((done / phase.topics.length) * 100);

      daysMeta.textContent = `${days} days`;
      doneMeta.textContent = `${done} / ${phase.topics.length} topics done`;
      fill.style.width = `${percent}%`;
      bar.setAttribute("aria-valuenow", String(percent));
      bar.classList.toggle("is-complete", percent === 100);
      badge.classList.toggle("is-visible", percent === 100);
    });

    document.getElementById("stat-days").textContent = String(totalDays);
    document.getElementById("stat-weeks").textContent = String(Math.ceil(totalDays / 7));
    document.getElementById("stat-topics").textContent = `${doneTopics} / ${topics.length}`;
    document.getElementById("stat-problems").textContent = `${solvedProblems} / ${totalProblems}`;

    const percentDone = Math.round((doneTopics / topics.length) * 100);
    document.getElementById("subnav-count").textContent = `${doneTopics} / ${topics.length} topics`;
    document.getElementById("subnav-fill").style.width = `${percentDone}%`;

    const ringFill = document.getElementById("ring-fill");
    const ringPercent = document.getElementById("ring-percent");
    if (ringFill) ringFill.style.strokeDashoffset = String(100 - percentDone);
    if (ringPercent) ringPercent.textContent = `${percentDone}%`;

    renderNext();
    renderReviews();
  }

  /* ---------- the closing section --------------------------------------- */
  function renderAfter() {
    const root = document.getElementById("after");
    if (!root || typeof AFTER === "undefined") return;

    const card = node("div", "after-card");
    const head = node("div", "after-head");
    const heading = node("h2", "", AFTER.title);
    heading.id = "after-title";
    head.append(node("p", "section-kicker", "Keep going"), heading, node("p", "card-text", AFTER.intro));
    card.append(head);

    const grid = node("div", "after-grid");
    AFTER.items.forEach((item) => {
      const block = node("div", "after-item");
      block.append(node("h3", "", item.title), node("p", "", item.text));
      if (item.links && item.links.length) {
        const links = node("ul", "after-links");
        item.links.forEach((link) => {
          const li = node("li");
          li.append(externalLink(link));
          links.append(li);
        });
        block.append(links);
      }
      grid.append(block);
    });
    card.append(grid);

    if (AFTER.routine) card.append(node("p", "after-routine", AFTER.routine));
    root.append(card);
  }

  /* ---------- which phase is on screen ----------------------------------- */
  function initScrollSpy() {
    const links = [...document.querySelectorAll(".subnav-link")];
    const sections = links
      .map((link) => ({ link, section: document.querySelector(link.getAttribute("href")) }))
      .filter((item) => item.section);
    if (!sections.length) return;

    let timer = 0;
    const update = () => {
      timer = 0;
      const line = window.scrollY + window.innerHeight * 0.3;
      let active = null;

      sections.forEach((item) => {
        const top = item.section.getBoundingClientRect().top + window.scrollY;
        if (top <= line) active = item.link;
      });

      links.forEach((link) => {
        const isActive = link === active;
        link.classList.toggle("is-active", isActive);
        if (isActive) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    const schedule = () => {
      if (timer) return;
      timer = window.setTimeout(update, 80);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
  }

  /* ---------- review scheduling ----------------------------------------- */
  function advanceReview(id) {
    const review = state.reviews.get(id);
    if (!review || !state.done.has(id)) return;

    const stage = review.stage + 1;
    if (stage >= REVIEW_DAYS.length) {
      state.reviews.delete(id);
    } else {
      state.reviews.set(id, { stage, due: addDays(todayISO(), REVIEW_DAYS[stage]) });
    }
    saveState();
    refresh();

    const nextButton = document.querySelector("[data-review]");
    if (nextButton) {
      nextButton.focus();
      return;
    }
    const card = document.getElementById("review-card");
    if (card) {
      card.tabIndex = -1;
      card.focus();
    }
  }

  /* ---------- events ----------------------------------------------------- */
  function bindEvents() {
    const root = document.getElementById("roadmap");

    root.addEventListener("change", (event) => {
      const box = event.target;
      if (!(box instanceof HTMLInputElement)) return;

      if (box.classList.contains("check")) {
        const id = box.dataset.id;
        if (!id || !topicIndex.has(id)) return;

        if (box.checked) {
          state.done.add(id);
          if (!state.reviews.has(id)) {
            state.reviews.set(id, { stage: 0, due: addDays(todayISO(), REVIEW_DAYS[0]) });
          }
        } else {
          state.done.delete(id);
          state.reviews.delete(id);
        }
        saveState();
        refresh();
        return;
      }

      if (box.classList.contains("pcheck")) {
        const id = box.dataset.id;
        if (!id) return;
        if (box.checked) state.solved.add(id);
        else state.solved.delete(id);
        saveState();
        refresh();
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const reviewButton = target.closest("[data-review]");
      if (reviewButton) {
        advanceReview(reviewButton.dataset.review);
        return;
      }

      const opener = target.closest("[data-open]");
      if (opener) {
        const ref = topicRefs.get(opener.dataset.open);
        const details = ref && ref.article.querySelector("details");
        if (details) details.open = true;
      }
    });

    const reset = document.getElementById("reset");
    if (reset) {
      reset.addEventListener("click", () => {
        if (!window.confirm("Clear all saved progress in this browser?")) return;
        state.done.clear();
        state.solved.clear();
        state.reviews.clear();
        try {
          localStorage.removeItem(STORE_KEY);
        } catch (_) {
          // nothing to clean up if storage is unavailable
        }
        refresh();
      });
    }
  }

  /* ---------- start ------------------------------------------------------ */
  renderGuide();
  renderSubnav();
  renderRoadmap();
  renderAfter();
  loadState();
  bindEvents();
  refresh();
  initScrollSpy();
})();
