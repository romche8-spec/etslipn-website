'use strict';
const menu = document.querySelector('.menu');
const nav = document.querySelector('#navigation');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); } });
document.addEventListener('click', event => { if (!event.target.closest('header')) closeMenu(); });
document.querySelector('#year').textContent = String(new Date().getFullYear());
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { document.querySelector('#service-select').value = link.dataset.service; document.querySelector('#form-result').hidden = true; }));
function buildQuoteMessage(data) {
 const lines = ['Bonjour ETS LIPN, je souhaite obtenir un devis.', '', `Nom : ${data.name}`, `Organisation : ${data.organization || 'Non précisée'}`, `Téléphone : ${data.phone}`, `E-mail : ${data.email || 'Non précisé'}`, `Service : ${data.service}`, `Lieu / itinéraire : ${data.location}`, `Date souhaitée : ${data.date || 'À convenir'}`, '', 'Détails du besoin :', data.details];
 return lines.join('\n');
}
const form = document.querySelector('#quote-form');
form.addEventListener('input', () => { document.querySelector('#form-result').hidden = true; });
form.addEventListener('submit', event => {
 event.preventDefault();
 if (!form.reportValidity()) return;
 const data = Object.fromEntries(new FormData(form));
 for (const key of ['name', 'phone', 'location', 'details']) {
  const field = form.elements.namedItem(key);
  field.setCustomValidity(data[key].trim() ? '' : 'Veuillez renseigner ce champ.');
  field.addEventListener('input', () => field.setCustomValidity(''), {once:true});
 }
 if (!form.reportValidity()) return;
 Object.keys(data).forEach(key => { data[key] = data[key].trim(); });
 const link = document.querySelector('#send-whatsapp');
 link.href = `https://wa.me/243970339904?text=${encodeURIComponent(buildQuoteMessage(data))}`;
 document.querySelector('#form-result').hidden = false;
 link.focus();
});
