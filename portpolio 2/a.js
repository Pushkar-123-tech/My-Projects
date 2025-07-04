var typed = new Typed("#typing", {
  strings: ["Frontend Developer", "Web Developer"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

var typed1 = new Typed("#typing1", {
  strings: [
    "I am a web Developer with extensive experience for over 1 years. Expertise is to create the website Design, frontend Design, and many more ..."
  ],
  typeSpeed: 20,
  loop: false
});

// Skills bar animation on section visible
const actualskill = document.querySelectorAll('.actualskill');
let skillsAnimated = false;

function animateSkills() {
  if (skillsAnimated) return;
  actualskill.forEach(skill => {
    const percent = parseInt(skill.innerHTML, 10);
    skill.style.backgroundColor = 'cyan';
    skill.style.width = '0%';
    setTimeout(() => {
      skill.style.width = percent + '%';
    }, 100);
  });
  skillsAnimated = true;
}

const skillsSection = document.querySelector('#skills');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
      }
    });
  },
  { threshold: 0.3 }
);

if (skillsSection) {
  observer.observe(skillsSection);
}