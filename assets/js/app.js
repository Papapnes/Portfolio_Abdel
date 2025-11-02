
(function(){
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Language switching
  const buttons = document.querySelectorAll('.lang-switch button');
  const translatables = document.querySelectorAll('[data-i18n]');
  let current = 'fr';

  function applyLang(lang){
    const d = dict[lang] || dict['fr'];
    translatables.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (d[key]) el.textContent = d[key];
    });
    document.documentElement.lang = lang;
    buttons.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    current = lang;
    // Direction RTL for Arabic
    if (lang === 'ar') {
      document.body.dir = 'rtl';
    } else {
      document.body.dir = 'ltr';
    }
  }
  buttons.forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));
  applyLang('fr');

  // Reveal contact
  const reveal = document.getElementById('reveal-contact');
  const panel = document.getElementById('contact-panel');
  if (reveal && panel){
    reveal.addEventListener('click', () => {
      panel.hidden = !panel.hidden;
    });
  }

  // Fake send (no backend)
  window.sendMessage = function(e){
    e.preventDefault();
    alert(current === 'ar' ? 'تم الإرسال (محاكاة). شكرًا!' :
          current === 'en' ? 'Message sent (demo). Thank you!' :
                             'Message envoyé (démo). Merci !');
    e.target.reset();
  }
})();
