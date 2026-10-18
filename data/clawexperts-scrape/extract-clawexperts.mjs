import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const ROOT = new URL('.', import.meta.url).pathname;
const RAW = path.join(ROOT, 'raw');
const RENDERED = path.join(ROOT, 'rendered');
const OUT = path.join(ROOT, 'processed');
const PAGE_TEXT = path.join(OUT, 'page_text');

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(PAGE_TEXT, { recursive: true });

function decodeEntities(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&mdash;/g, '-')
    .replace(/&ndash;/g, '-')
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"');
}

function htmlToText(html) {
  let s = html;
  s = s.replace(/<script[\s\S]*?<\/script>/gi, '\n');
  s = s.replace(/<style[\s\S]*?<\/style>/gi, '\n');
  s = s.replace(/<svg[\s\S]*?<\/svg>/gi, ' ');
  s = s.replace(/<(h[1-6]|p|li|br|tr|div|section|article|header|footer|button|a)\b[^>]*>/gi, '\n');
  s = s.replace(/<\/(h[1-6]|p|li|tr|div|section|article|header|footer|button|a)>/gi, '\n');
  s = s.replace(/<[^>]+>/g, ' ');
  s = decodeEntities(s);
  const seen = new Set();
  return s
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .filter((line) => {
      if (line.length === 1 && /[.|+]/.test(line)) return false;
      const key = line.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .join('\n');
}

function writeJson(name, value) {
  fs.writeFileSync(path.join(OUT, name), JSON.stringify(value, null, 2));
}

function extractUseCases() {
  const js = fs.readFileSync(path.join(RAW, 'useCasesData-ocwl2MzT.js'), 'utf8');
  const catMatch = js.match(/Wn=(\[[\s\S]*?\]),Vn=/);
  const dataStart = js.indexOf('Vn=');
  const dataEnd = js.indexOf('},Fn=', dataStart);
  if (!catMatch || dataStart < 0 || dataEnd < 0) {
    throw new Error('Could not locate use case data in bundle');
  }
  const categories = vm.runInNewContext(catMatch[1]);
  const literal = js.slice(dataStart + 3, dataEnd + 1);
  const grouped = vm.runInNewContext(`(${literal})`);
  const slugify = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  const useCases = [];
  for (const [categoryId, rows] of Object.entries(grouped)) {
    for (const row of rows) {
      useCases.push({
        category_id: categoryId,
        category_en: categories.find((c) => c.id === categoryId)?.en || categoryId,
        category_vi: categories.find((c) => c.id === categoryId)?.vi || categoryId,
        slug: slugify(row[0]),
        title_en: row[0],
        title_vi: row[1],
        description_en: row[2],
        description_vi: row[3],
        icon: row[4],
        source_url: `https://clawexperts.com/use-cases?case=${slugify(row[0])}`,
      });
    }
  }
  return { categories, count: useCases.length, use_cases: useCases };
}

const pricing = {
  source_url: 'https://clawexperts.com/#pricing',
  captured_at_utc: new Date().toISOString(),
  headline_en: 'Start small. Scale as you grow.',
  headline_vi: 'Bắt đầu đơn giản. Scale theo nhu cầu.',
  notes_en: ['No setup', 'No API key required', 'Free AI tokens included'],
  notes_vi: ['Không cần setup', 'Không cần API key', 'Có sẵn AI tokens miễn phí'],
  plans: [
    {
      id: 'free',
      name: 'FREE',
      price_usd: 'Free',
      price_vnd: 'Miễn phí',
      period_en: null,
      period_vi: null,
      description_en: 'Try OpenClaw with a real instance, no card needed',
      description_vi: 'Dùng thử OpenClaw với instance thật, không cần thẻ',
      includes_en: [
        'Instance ready on signup',
        'Full OpenClaw access',
        'Free AI tokens',
        'Sleeps after 48h idle',
        'Reclaimed after 96h idle',
        'Community support',
      ],
      includes_vi: [
        'Có instance ngay khi đăng ký',
        'Truy cập đầy đủ OpenClaw',
        'Có sẵn AI tokens miễn phí',
        'Tự ngủ sau 48 giờ',
        'Bị thu hồi sau 96 giờ',
        'Hỗ trợ từ cộng đồng',
      ],
      best_for_en: ['Trying out OpenClaw', 'Building a first agent flow', '1-2 concurrent tasks'],
      best_for_vi: ['Dùng thử OpenClaw', 'Thử build agent flow đầu tiên', '1-2 tác vụ cùng lúc'],
      hardware: { vcpu: 1, ram_gb: 4, ssd_gb: 1 },
      cta_en: 'Use Free',
      cta_vi: 'Dùng gói Free',
    },
    {
      id: 'starter',
      name: 'STARTER',
      launch_offer: true,
      price_usd: '$4',
      original_price_usd: '$9',
      price_vnd: '99.000₫',
      original_price_vnd: '225.000₫',
      period_en: '/month',
      period_vi: '/tháng',
      description_en: 'For getting started with AI automation',
      description_vi: 'Dành cho người mới bắt đầu với AI automation',
      includes_en: [
        'Full OpenClaw access',
        'Free AI tokens',
        'No API key needed',
        'Runs 24/7',
        'Connect 100+ apps',
        'Community support',
      ],
      includes_vi: [
        'Truy cập đầy đủ OpenClaw',
        'Có sẵn AI tokens miễn phí',
        'Không cần API key',
        'Chạy 24/7',
        'Kết nối 100+ ứng dụng',
        'Hỗ trợ từ cộng đồng',
      ],
      best_for_en: ['Personal workflows', 'AI beginners', '1-2 lightweight agents'],
      best_for_vi: ['Workflow cá nhân', 'Người mới dùng AI', '1-2 agents nhẹ'],
      hardware: { vcpu: 2, ram_gb: 4, ssd_gb: 5 },
      cta_en: 'Get started',
      cta_vi: 'Bắt đầu ngay',
    },
    {
      id: 'daily',
      name: 'DAILY',
      launch_offer: true,
      highlighted: true,
      price_usd: '$9',
      original_price_usd: '$19',
      price_vnd: '249.000₫',
      original_price_vnd: '475.000₫',
      period_en: '/month',
      period_vi: '/tháng',
      description_en: 'For people using AI and automation every day',
      description_vi: 'Dành cho người dùng AI và automation mỗi ngày',
      includes_en: [
        'Includes all Starter features',
        'Faster, stable execution',
        'Parallel workflows',
        'Better with connected apps',
        'Better for daily AI workloads',
        'AI specialist support',
      ],
      includes_vi: [
        'Mọi tính năng gói Starter',
        'Chạy nhanh và ổn định hơn',
        'Workflow song song',
        'Hoạt động tốt hơn với nhiều tools',
        'Tối ưu cho nhu cầu sử dụng hằng ngày',
        'Hỗ trợ từ chuyên gia AI',
      ],
      best_for_en: ['Daily automation', 'Multi-app workflows', '3-5 active workflows'],
      best_for_vi: ['Tự động hoá hằng ngày', 'Workflow kết nối nhiều ứng dụng', '3-5 workflows'],
      hardware: { vcpu: 4, ram_gb: 8, ssd_gb: 10 },
      cta_en: 'Automate more',
      cta_vi: 'Tăng tốc ngay',
    },
    {
      id: 'scale',
      name: 'SCALE',
      launch_offer: true,
      price_usd: '$19',
      original_price_usd: '$39',
      price_vnd: '499.000₫',
      original_price_vnd: '975.000₫',
      period_en: '/month',
      period_vi: '/tháng',
      description_en: 'For advanced workflows and heavy automation',
      description_vi: 'Dành cho workflow nâng cao và khối lượng automation lớn',
      includes_en: [
        'Includes all Daily features',
        'More simultaneous agents',
        'Stable under heavy workloads',
        'Long-running workflows',
        'Higher runtime capacity',
        'Priority 1:1 AI specialist support',
      ],
      includes_vi: [
        'Mọi tính năng gói Daily',
        'Chạy nhiều agents đồng thời hơn',
        'Ổn định với workload lớn',
        'Phù hợp cho workflow chạy dài',
        'Năng lực xử lý cao hơn',
        'Hỗ trợ ưu tiên 1:1 từ chuyên gia AI',
      ],
      best_for_en: ['Teams', 'Production workflows', 'Heavy automation'],
      best_for_vi: ['Team', 'Workflow vận hành thực tế', 'Khối lượng automation lớn'],
      hardware: { vcpu: 8, ram_gb: 16, ssd_gb: 40 },
      cta_en: 'Run at scale',
      cta_vi: 'Mở rộng workflow',
    },
  ],
  payment_trust_en: ['Guaranteed safe & secure checkout', 'Stripe', 'Unconditional refund if not satisfied', 'No setup costs. Cancel anytime.'],
  payment_trust_vi: ['Thanh toán an toàn & bảo mật', 'Stripe', 'Hoàn tiền không điều kiện nếu không hài lòng', 'Không phí setup. Có thể huỷ bất cứ lúc nào.'],
};

const product = {
  source_url: 'https://clawexperts.com/',
  brand: 'ClawExperts',
  legal_entity: 'PROMER PTE. LTD.',
  address: '68 CIRCULAR ROAD, #02-01, SINGAPORE 049422',
  contact_email: 'team@clawexperts.com',
  social_links: ['https://www.facebook.com/clawxperts/', 'https://www.linkedin.com/company/clawexperts/'],
  positioning_en: 'Deploy OpenClaw on cloud without setup. Managed infrastructure, deployment, and maintenance for 24/7 OpenClaw agents.',
  positioning_vi: 'Triển khai OpenClaw trên cloud không cần setup. Hạ tầng, triển khai và bảo trì được quản lý để agent chạy 24/7.',
  core_claims_en: ['Get OpenClaw live on Cloud in 2 minutes', 'Zero setup', 'Always on', 'Your agent runs while you sleep'],
  stats_en: ['170+ app integrations', '60,000+ ready-made skills', 'Multiple AI providers', 'Free daily credits'],
  nav_product_items: [
    { id: 'setup', en: 'Instant Deploy', vi: 'Triển khai tức thì' },
    { id: 'ai-models', en: 'AI models', vi: 'AI models' },
    { id: 'integrations', en: 'Connector', vi: 'Kết nối' },
    { id: 'channels', en: 'Integration', vi: 'Ứng dụng' },
    { id: 'skills', en: 'Skills', vi: 'Kỹ năng' },
    { id: 'expert-support', en: 'Expert Assist', vi: 'Chuyên gia Hỗ trợ' },
  ],
  disclaimer_en: 'ClawExperts.com is an independent platform, not affiliated with OpenClaw or Molty. Runs on your private cloud, no setup required.',
  disclaimer_vi: 'ClawExperts.com là nền tảng độc lập, không thuộc OpenClaw hay Molty. Chạy trên cloud riêng của bạn, không cần setup.',
};

const pages = [];
for (const file of fs.readdirSync(RENDERED).filter((f) => f.endsWith('.html')).sort()) {
  const html = fs.readFileSync(path.join(RENDERED, file), 'utf8');
  const text = htmlToText(html);
  const slug = file.replace(/\.html$/, '');
  fs.writeFileSync(path.join(PAGE_TEXT, `${slug}.txt`), text);
  pages.push({
    file,
    route: slug === 'home' ? '/' : `/${slug.replace(/_/g, '/')}`,
    source_url: `https://clawexperts.com${slug === 'home' ? '/' : `/${slug.replace(/_/g, '/')}`}`,
    text_file: `processed/page_text/${slug}.txt`,
    char_count: text.length,
  });
}

const renderedBlogPostsDir = path.join(RENDERED, 'blog_posts');
const blogPostTexts = [];
if (fs.existsSync(renderedBlogPostsDir)) {
  for (const file of fs.readdirSync(renderedBlogPostsDir).filter((f) => f.endsWith('.html')).sort()) {
    const html = fs.readFileSync(path.join(renderedBlogPostsDir, file), 'utf8');
    const text = htmlToText(html);
    const slug = file.replace(/\.html$/, '');
    const outName = `blog_post_${slug}.txt`;
    fs.writeFileSync(path.join(PAGE_TEXT, outName), text);
    blogPostTexts.push({
      slug,
      source_url: `https://clawexperts.com/blog/${slug}`,
      text_file: `processed/page_text/${outName}`,
      char_count: text.length,
    });
  }
}

const useCases = extractUseCases();

const blogBundle = fs.readFileSync(path.join(RAW, 'BlogPage-DERy7WTo.js'), 'utf8');
const blogPosts = [];
for (const m of blogBundle.matchAll(/slug:"([^"]+)",titleEN:"([^"]+)",titleVI:"([^"]+)",excerptEN:"([^"]+)",excerptVI:"([^"]+)",category:"([^"]+)",date:"([^"]+)",readTime:"([^"]+)"/g)) {
  blogPosts.push({
    slug: m[1],
    title_en: decodeEntities(m[2]),
    title_vi: decodeEntities(m[3]),
    excerpt_en: decodeEntities(m[4]),
    excerpt_vi: decodeEntities(m[5]),
    category: m[6],
    date: m[7],
    read_time: m[8],
    source_url: `https://clawexperts.com/blog?post=${m[1]}`,
  });
}

writeJson('manifest.json', {
  source: 'https://clawexperts.com/',
  captured_at_utc: new Date().toISOString(),
  robots_content_signal: 'search=yes, ai-train=no, use=reference',
  intended_use: 'Private reference/RAG knowledge base for an agent, not foundation-model training.',
  pages,
  raw_assets: fs.readdirSync(RAW).sort(),
  outputs: ['product.json', 'pricing.json', 'use_cases.json', 'blog_posts.json', 'knowledge_base.md', 'training_chunks.jsonl'],
});
writeJson('product.json', product);
writeJson('pricing.json', pricing);
writeJson('use_cases.json', useCases);
writeJson('blog_posts.json', { count: blogPosts.length, posts: blogPosts });
writeJson('blog_post_texts.json', { count: blogPostTexts.length, posts: blogPostTexts });

const chunks = [];
function addChunk(id, title, sourceUrl, content, metadata = {}) {
  chunks.push({ id, title, source_url: sourceUrl, content, metadata });
}

addChunk('product-overview', 'ClawExperts product overview', product.source_url, [
  product.positioning_en,
  product.positioning_vi,
  `Claims: ${product.core_claims_en.join('; ')}`,
  `Stats: ${product.stats_en.join('; ')}`,
  `Contact: ${product.contact_email}`,
  `Legal entity: ${product.legal_entity}, ${product.address}`,
].join('\n'), { type: 'product' });

for (const plan of pricing.plans) {
  addChunk(`pricing-${plan.id}`, `Pricing plan: ${plan.name}`, pricing.source_url, [
    `${plan.name}: ${plan.price_usd}${plan.period_en || ''} / ${plan.price_vnd}${plan.period_vi || ''}`,
    plan.original_price_usd ? `Original: ${plan.original_price_usd} / ${plan.original_price_vnd}` : '',
    `EN: ${plan.description_en}`,
    `VI: ${plan.description_vi}`,
    `Includes EN: ${plan.includes_en.join('; ')}`,
    `Includes VI: ${plan.includes_vi.join('; ')}`,
    `Best for EN: ${plan.best_for_en.join('; ')}`,
    `Best for VI: ${plan.best_for_vi.join('; ')}`,
    `Hardware: ${plan.hardware.vcpu} vCPU, ${plan.hardware.ram_gb} GB RAM, ${plan.hardware.ssd_gb} GB SSD`,
  ].filter(Boolean).join('\n'), { type: 'pricing', plan_id: plan.id });
}

for (const item of useCases.use_cases) {
  addChunk(`use-case-${item.slug}`, item.title_en, item.source_url, [
    `Category: ${item.category_en} / ${item.category_vi}`,
    `EN: ${item.title_en} - ${item.description_en}`,
    `VI: ${item.title_vi} - ${item.description_vi}`,
  ].join('\n'), { type: 'use_case', category_id: item.category_id, slug: item.slug });
}

for (const page of pages) {
  const text = fs.readFileSync(path.join(ROOT, page.text_file), 'utf8');
  addChunk(`page-${page.route.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'home'}`, `Page ${page.route}`, page.source_url, text.slice(0, 12000), { type: 'page_text', route: page.route });
}

for (const post of blogPostTexts) {
  const text = fs.readFileSync(path.join(ROOT, post.text_file), 'utf8');
  addChunk(`blog-post-${post.slug}`, `Blog post ${post.slug}`, post.source_url, text.slice(0, 18000), { type: 'blog_post', slug: post.slug });
}

fs.writeFileSync(path.join(OUT, 'training_chunks.jsonl'), chunks.map((c) => JSON.stringify(c)).join('\n') + '\n');

const md = [];
md.push('# ClawExperts Knowledge Base');
md.push('');
md.push(`Captured: ${new Date().toISOString()}`);
md.push('');
md.push('Note: robots.txt advertises `Content-signal: search=yes, ai-train=no, use=reference`; use this as a private reference/RAG KB unless the site owner explicitly changes that policy.');
md.push('');
md.push('## Product');
md.push(`- Brand: ${product.brand}`);
md.push(`- Positioning EN: ${product.positioning_en}`);
md.push(`- Positioning VI: ${product.positioning_vi}`);
md.push(`- Contact: ${product.contact_email}`);
md.push(`- Legal entity: ${product.legal_entity}, ${product.address}`);
md.push('');
md.push('## Pricing');
for (const plan of pricing.plans) {
  md.push(`### ${plan.name}`);
  md.push(`- Price: ${plan.price_usd}${plan.period_en || ''} / ${plan.price_vnd}${plan.period_vi || ''}`);
  if (plan.original_price_usd) md.push(`- Original price: ${plan.original_price_usd} / ${plan.original_price_vnd}`);
  md.push(`- Description: ${plan.description_en} / ${plan.description_vi}`);
  md.push(`- Hardware: ${plan.hardware.vcpu} vCPU, ${plan.hardware.ram_gb} GB RAM, ${plan.hardware.ssd_gb} GB SSD`);
  md.push(`- Includes EN: ${plan.includes_en.join('; ')}`);
  md.push(`- Includes VI: ${plan.includes_vi.join('; ')}`);
  md.push(`- Best for EN: ${plan.best_for_en.join('; ')}`);
  md.push(`- Best for VI: ${plan.best_for_vi.join('; ')}`);
  md.push('');
}
md.push('## Use Cases');
md.push(`Total: ${useCases.count}`);
for (const c of useCases.categories) {
  const count = useCases.use_cases.filter((u) => u.category_id === c.id).length;
  md.push(`- ${c.en} / ${c.vi}: ${count}`);
}
md.push('');
md.push('## Blog Posts');
md.push(`Total parsed: ${blogPosts.length}`);
for (const post of blogPosts) md.push(`- ${post.title_en} / ${post.title_vi} (${post.date})`);
md.push(`Full text rendered: ${blogPostTexts.length}`);
md.push('');
md.push('## Files');
md.push('- `product.json`: product positioning, contact, navigation, claims');
md.push('- `pricing.json`: structured pricing table');
md.push('- `use_cases.json`: structured use-case catalog');
md.push('- `blog_posts.json`: parsed blog metadata');
md.push('- `blog_post_texts.json`: rendered full blog post text file index');
md.push('- `page_text/*.txt`: rendered page text from sitemap routes');
md.push('- `training_chunks.jsonl`: RAG-ready chunks');

fs.writeFileSync(path.join(OUT, 'knowledge_base.md'), md.join('\n'));

console.log(JSON.stringify({
  pages: pages.length,
  use_cases: useCases.count,
  blog_posts: blogPosts.length,
  rendered_blog_posts: blogPostTexts.length,
  chunks: chunks.length,
  output_dir: OUT,
}, null, 2));
