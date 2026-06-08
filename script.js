// Custom cursor
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
  });
  function animateFollower() {
    followerX += (mouseX - followerX - 18) * 0.12;
    followerY += (mouseY - followerY - 18) * 0.12;
    follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();
  document.querySelectorAll('a, button, .nav-dot, .tech-tag, .social-link, .social-big').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform += ' scale(2)'; follower.style.opacity = '0.3'; });
    el.addEventListener('mouseleave', () => { follower.style.opacity = '0.6'; });
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.12 });
  reveals.forEach(r => revealObserver.observe(r));

  // Skill bars animation
  const skillBars = document.querySelectorAll('.skill-bar');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const bar = e.target;
        bar.style.width = bar.dataset.width + '%';
      }
    });
  }, { threshold: 0.5 });
  skillBars.forEach(b => barObserver.observe(b));

  // Nav dots
  const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
  const dots = document.querySelectorAll('.nav-dot');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + window.innerHeight / 2;
    sections.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
        dots.forEach(d => d.classList.remove('active'));
        dots[i].classList.add('active');
      }
    });
  });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      document.getElementById(sections[i]).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Form submit
  function handleSubmit() {
    const fname = document.getElementById('fname').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!fname || !email || !message) {
      alert('Please fill in your name, email, and message.');
      return;
    }
    const btn = document.getElementById('submitBtn');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Message Sent!';
      document.getElementById('formSuccess').style.display = 'block';
      document.getElementById('fname').value = '';
      document.getElementById('lname').value = '';
      document.getElementById('email').value = '';
      document.getElementById('subject').value = '';
      document.getElementById('message').value = '';
      setTimeout(() => {
        btn.innerHTML = 'Send Message <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
        btn.disabled = false;
        document.getElementById('formSuccess').style.display = 'none';
      }, 4000);
    }, 1500);
  }