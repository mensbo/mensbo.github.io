const parseMarkdown = (source) => {
  const parts = source.split(/^---\s*$/m);
  const metadata = {};
  (parts[1] || '').trim().split('\n').forEach((line) => {
    const separator = line.indexOf(':');
    if (separator > -1) metadata[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  });
  const body = (parts[2] || '').trim();
  const paragraphs = body.replace(/^## .+$/gm, '').trim().split(/\n\s*\n/).filter(Boolean);
  return { ...metadata, body, paragraphs };
};

const readContent = async (folder, filename) => {
  const response = await fetch(`content/${folder}/${filename}`);
  if (!response.ok) throw new Error(`Gagal memuat ${filename}`);
  return parseMarkdown(await response.text());
};

const createProjectCard = (item) => {
  const article = document.createElement('article');
  article.className = `project-card ${item.visual || 'visual-void'}`;
  article.dataset.category = item.category;
  article.innerHTML = `<div class="project-visual ${item.visual || 'visual-void'}"><div class="content-art">${item.title.split(' ').slice(0, 2).join('<br>')}</div></div><div class="project-info"><div><p class="card-kicker">— ${item.category} / ${item.year}</p><h3>${item.title}</h3><p>${item.summary}</p></div><a class="circle-arrow" target="_blank" rel="noreferrer" href="project.html?item=${item.slug}" aria-label="Baca ${item.title}">↗</a></div>`;
  return article;
};

const loadProjects = async () => {
  const list = document.querySelector('#project-list');
  if (!list) return;
  try {
    const manifest = await fetch('content/content-index.json').then((response) => response.json());
    const items = await Promise.all(manifest.projects.map((file) => readContent('projects', file)));
    list.replaceChildren(...items.map(createProjectCard));
    document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('active', item === button));
      list.querySelectorAll('.project-card').forEach((card) => { card.hidden = button.dataset.filter !== 'all' && card.dataset.filter !== button.dataset.filter; });
    }));
  } catch (error) { list.innerHTML = '<p class="loading-state">Content belum dapat dimuat. Jalankan melalui static server.</p>'; }
};

const createTutorialRow = (item) => {
  const link = document.createElement('a');
  link.className = 'note-row';
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.href = `tutorial.html?item=${item.slug}`;
  link.innerHTML = `<span class="note-number">—</span><div class="note-main"><h3>${item.title}</h3><p>${item.category} · ${item.duration}</p></div><span class="note-arrow">↗</span>`;
  return link;
};

const loadTutorials = async () => {
  const list = document.querySelector('#tutorial-list');
  if (!list) return;
  try {
    const manifest = await fetch('content/content-index.json').then((response) => response.json());
    const items = await Promise.all(manifest.tutorials.map((file) => readContent('tutorials', file)));
    list.replaceChildren(...items.map(createTutorialRow));
  } catch (error) { list.innerHTML = '<p class="loading-state">Content belum dapat dimuat. Jalankan melalui static server.</p>'; }
};

loadProjects();
loadTutorials();
