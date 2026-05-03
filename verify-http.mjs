const target = 'https://decaybrief-prototype.netlify.app';
const res = await fetch(target, { redirect: 'follow' });
const html = await res.text();
const checks = {
  hero: /Recover lost traffic before old posts quietly fade out\./i.test(html),
  dashboard: /Opportunity dashboard/i.test(html),
  detail: /Article detail/i.test(html),
  brief: /Refresh brief/i.test(html),
};
console.log(JSON.stringify({ target, status: res.status, checks }));
