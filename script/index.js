const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");   
};

const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove('hidden')
        document.getElementById("word-container").classList.add('hidden')
    }
    else{
        document.getElementById("word-container").classList.remove('hidden')
        document.getElementById("spinner").classList.add('hidden')

    }
}

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //Promise of response
    .then((res) => res.json()) //promise of json data
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  //   console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
    manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};
const displayWordDetails = (word) => {
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
    <div class="">
              <h2 class="text-2xl font-bold">
                ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :ইগার)
              </h2>
            </div>
            <div class="">
              <h2 class="font-bold">Meaning</h2>
              <p>${word.meaning}</p>
            </div>
            <div class="">
              <h2 class="font-bold">Example</h2>
              <p>${word.sentence}</p>
            </div>
            <div class="">
              <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
              <div class="">${createElements(word.synonyms)}</div?
                          
            </div>
    `;
  document.getElementById("word_model").showModal();
};

const displayLevelWord = (word) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (word.length == 0) {
    wordContainer.innerHTML = `
        <div class="text-center space-y-2 col-span-full">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-sm text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-4xl font-semibold font-bangla">নেক্সট Lesson এ যান</h2>

        </div>
        `;
    manageSpinner(false)
    return;
  }

  word.forEach((word) => {
    // console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class=" font-bold text-2xl">${
          word.word ? word.word : "শব্দ পাওয়া যায়নি"
        } </h2>
        <p class="font-semibold">Meaning /Pronounciation</p>

        <div class="text-2xl font-medium font-bangla">"${
          word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
        } / ${
      word.pronunciation ? word.pronunciation : "pronunciatio পাওয়া যায়নি"
    }"</div>

        <div class="flex justify-between items-center">

          <button onclick="loadWordDetail(${
            word.id
          })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info "></i></button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>

        </div>

      </div>
        `;

    wordContainer.append(card);
  });
  manageSpinner(false);
};

const displayLesson = (lessons) => {
  // 1. get the container

  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  // 2. get into evey keasson
  for (let lesson of lessons) {
    // 3. creat element
    // console.log(lesson);

    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
                <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"
                ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
                </button>
            `;
    // 4. append into container

    levelContainer.append(btnDiv);
  }
};
loadLessons();
