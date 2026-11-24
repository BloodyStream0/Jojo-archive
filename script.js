// Base de données : tu peux ajouter des personnages dans ce tableau.
const characters = [
  { name:"Jonathan Joestar", part:"Phantom Blood", type:"JoJo", stand:"Aucun (Hamon)", symbol:"01", description:"Le premier Joestar. Jonathan est connu pour son sens de l'honneur, sa gentillesse et son courage face à Dio." },
  { name:"Joseph Joestar", part:"Battle Tendency", type:"JoJo", stand:"Hermit Purple (plus tard)", symbol:"02", description:"Malin et imprévisible, Joseph préfère souvent utiliser la ruse plutôt que la force brute." },
  { name:"Jotaro Kujo", part:"Stardust Crusaders", type:"JoJo", stand:"Star Platinum", symbol:"03", description:"Calme et déterminé, Jotaro possède un Stand réputé pour sa puissance et sa précision." },
  { name:"Josuke Higashikata", part:"Diamond is Unbreakable", type:"JoJo", stand:"Crazy Diamond", symbol:"04", description:"Josuke protège Morioh et peut réparer ou restaurer les objets et les êtres vivants avec son Stand." },
  { name:"Giorno Giovanna", part:"Golden Wind", type:"JoJo", stand:"Gold Experience", symbol:"05", description:"Giorno poursuit son rêve de devenir une personne influente du milieu mafieux pour changer les choses." },
  { name:"Jolyne Cujoh", part:"Stone Ocean", type:"JoJo", stand:"Stone Free", symbol:"06", description:"Jolyne fait preuve d'une grande détermination et apprend à exploiter les capacités étonnantes de son Stand." },
  { name:"Robert E. O. Speedwagon", part:"Phantom Blood", type:"Allié", stand:"Aucun", symbol:"SP", description:"Fidèle allié des Joestar, Speedwagon devient un soutien essentiel à leur héritage." },
  { name:"Jean Pierre Polnareff", part:"Stardust Crusaders", type:"Allié", stand:"Silver Chariot", symbol:"JP", description:"Chevalier au grand cœur, Polnareff est un combattant fier, loyal et parfois comique." },
  { name:"Bruno Bucciarati", part:"Golden Wind", type:"Allié", stand:"Sticky Fingers", symbol:"BB", description:"Leader respecté, Bucciarati agit selon un sens profond de la justice et protège son équipe." },
  { name:"Dio Brando", part:"Phantom Blood / Stardust Crusaders", type:"Antagoniste", stand:"The World (Partie 3)", symbol:"DIO", description:"L'un des adversaires les plus emblématiques de la famille Joestar, ambitieux et extrêmement dangereux." },
  { name:"Yoshikage Kira", part:"Diamond is Unbreakable", type:"Antagoniste", stand:"Killer Queen", symbol:"KQ", description:"Un antagoniste discret qui cherche à préserver une vie tranquille tout en cachant sa véritable nature." },
  { name:"Enrico Pucci", part:"Stone Ocean", type:"Antagoniste", stand:"Whitesnake / C-Moon / Made in Heaven", symbol:"EP", description:"Prêtre animé par une vision particulière du destin et de ce qu'il considère comme le paradis." }
];

const parts = [
  ["PART 01","Phantom Blood","L'origine de la rivalité entre Jonathan et Dio."],
  ["PART 02","Battle Tendency","Joseph affronte les Hommes du Pilier."],
  ["PART 03","Stardust Crusaders","Un voyage autour du monde pour sauver Holly."],
  ["PART 04","Diamond is Unbreakable","Des événements étranges à Morioh."],
  ["PART 05","Golden Wind","Giorno poursuit son rêve en Italie."],
  ["PART 06","Stone Ocean","Jolyne se bat pour sa liberté."],
  ["PART 07","Steel Ball Run","Une course à travers l'Amérique."],
  ["PART 08","JoJolion","Une enquête mystérieuse à Morioh."],
  ["PART 09","The JOJOLands","Une nouvelle génération dans les îles Hawaï."]
];

const questions = [
  { q:"Quel est le Stand de Jotaro Kujo ?", a:["Crazy Diamond","Star Platinum","Silver Chariot"], correct:1, info:"Star Platinum est le Stand de Jotaro." },
  { q:"Dans quelle partie apparaît Giorno Giovanna ?", a:["Golden Wind","Stone Ocean","Battle Tendency"], correct:0, info:"Giorno est le protagoniste de Golden Wind." },
  { q:"Quel personnage utilise Silver Chariot ?", a:["Bruno Bucciarati","Polnareff","Joseph Joestar"], correct:1, info:"Silver Chariot est le Stand de Jean Pierre Polnareff." },
  { q:"Dans quelle ville se déroule principalement la partie 4 ?", a:["Naples","Morioh","Le Caire"], correct:1, info:"Diamond is Unbreakable se déroule principalement à Morioh." }
];

const grid = document.querySelector("#characterGrid");
const searchInput = document.querySelector("#searchInput");
const emptyMessage = document.querySelector("#emptyMessage");
let activeFilter = "Tous";

function renderCharacters() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = characters.filter(person => {
    const matchesFilter = activeFilter === "Tous" || person.type === activeFilter;
    const matchesSearch = `${person.name} ${person.part} ${person.stand} ${person.type}`.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  grid.innerHTML = "";
  visible.forEach((person, index) => {
    const card = document.createElement("button");
    card.className = "character-card";
    card.type = "button";
    card.dataset.symbol = person.symbol;
    card.innerHTML = `
      <span class="card-number">FILE / ${String(index + 1).padStart(3, "0")}</span>
      <span class="card-name">${person.name}</span>
      <span class="card-meta">${person.part}</span>
      <span class="card-type">${person.type}</span>`;
    card.addEventListener("click", () => openCharacter(person));
    grid.appendChild(card);
  });
  emptyMessage.hidden = visible.length !== 0;
}

function openCharacter(person) {
  document.querySelector("#dialogCategory").textContent = `PERSONNAGE / ${person.type.toUpperCase()}`;
  document.querySelector("#dialogName").textContent = person.name;
  document.querySelector("#dialogPart").textContent = person.part;
  document.querySelector("#dialogDescription").textContent = person.description;
  document.querySelector("#dialogStand").textContent = person.stand;
  document.querySelector("#characterDialog").showModal();
}

document.querySelector("#filterButtons").addEventListener("click", event => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
  renderCharacters();
});
searchInput.addEventListener("input", renderCharacters);
document.querySelector("#characterCount").textContent = characters.length;

const partsGrid = document.querySelector("#partsGrid");
parts.forEach(([number, name, description]) => {
  const article = document.createElement("article");
  article.className = "part-card";
  article.innerHTML = `<span>${number}</span><h3>${name}</h3><p>${description}</p>`;
  partsGrid.appendChild(article);
});

document.querySelector("#closeDialog").addEventListener("click", () => document.querySelector("#characterDialog").close());
document.querySelector("#characterDialog").addEventListener("click", event => {
  if (event.target.id === "characterDialog") event.target.close();
});

document.querySelector("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  document.querySelector("#themeToggle").textContent = document.body.classList.contains("light") ? "☀" : "☾";
});

let questionIndex = 0;
function showQuestion() {
  const question = questions[questionIndex];
  document.querySelector("#quizQuestion").textContent = question.q;
  document.querySelector("#quizFeedback").textContent = "";
  const answers = document.querySelector("#quizAnswers");
  answers.innerHTML = "";
  question.a.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "quiz-answer";
    button.textContent = answer;
    button.addEventListener("click", () => {
      const all = answers.querySelectorAll("button");
      all.forEach((item, i) => {
        item.disabled = true;
        if (i === question.correct) item.classList.add("correct");
      });
      if (index !== question.correct) button.classList.add("wrong");
      document.querySelector("#quizFeedback").textContent =
        index === question.correct ? `Bonne réponse ! ${question.info}` : `Pas tout à fait. ${question.info}`;
    });
    answers.appendChild(button);
  });
}
document.querySelector("#nextQuestion").addEventListener("click", () => {
  questionIndex = (questionIndex + 1) % questions.length;
  showQuestion();
});

renderCharacters();
showQuestion();
