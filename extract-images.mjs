import fs from 'fs';

const html = fs.readFileSync('./index.html', 'utf8');

// Match img-item anchors with data-lightbox and optional data-caption
const re = /class="img-item"[^>]*?data-lightbox="(data:image\/[^;]+;base64,([^"]+))"[^>]*?(?:data-caption="([^"]*)")?/g;

let m, i = 1;
while ((m = re.exec(html)) !== null) {
  const [, , b64, caption] = m;
  const ext = 'jpg';
  const slug = caption
    ? caption.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    : `work-${String(i).padStart(2, '0')}`;
  const filename = `${slug}.${ext}`;
  const buf = Buffer.from(b64, 'base64');
  fs.writeFileSync(`./public/images/${filename}`, buf);
  console.log(`✓ ${filename}  (${Math.round(buf.length / 1024)}kb)`);
  i++;
}
