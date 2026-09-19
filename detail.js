const params = new URLSearchParams(window.location.search);
const item = params.get('item');
const isTutorial = window.location.pathname.endsWith('tutorial.html');
const folder = isTutorial ? 'tutorials' : 'projects';
const manifestKey = isTutorial ? 'tutorials' : 'projects';

const renderMarkdown = (markdown) => markdown
  .replace(/^## (.+)$/gm, '<h2>$1</h2>')
  .replace(/^(?!<h2>)(.+)$/gm, '<p>$1</p>')
  .replace(/<p><\/p>/g, '');

const loadDetail = async () => {
  const manifest = await fetch('content/content-index.json').then((response) => response.json());
  const filenames = manifest[manifestKey];
  const filename = filenames.find((entry) => entry.replace('.md', '').includes(item));
  if (!filename) throw new Error('Content tidak ditemukan');
  const response = await fetch(`content/${folder}/${filename}`);
  const source = await response.text();
  const content = parseMarkdown(source);
  document.title = `${content.title} — Menas`;
  document.querySelector('#detail-title').textContent = content.title;
  document.querySelector('#detail-content').innerHTML = renderMarkdown(content.body);
};

const parseMarkdown = (source) => {
  const parts = source.split(/^---\s*$/m);
  const metadata = {};
  (parts[1] || '').trim().split('\n').forEach((line) => {
    const separator = line.indexOf(':');
    if (separator > -1) metadata[line.slice(0, separator).trim()] = line.slice(separator + 1).trim();
  });
  return { ...metadata, body: (parts[2] || '').trim() };
};

loadDetail().catch(() => {
  document.querySelector('#detail-title').textContent = 'Content tidak ditemukan';
});
