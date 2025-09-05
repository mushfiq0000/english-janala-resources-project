const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //Promise of response
    .then((res) => res.json()) //promise of json data 
    .then((json) => displayLesson(json.data));
    
};
const loadLeveWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data))
}



// {
//     "id": 86,
//     "level": 1,
//     "word": "Milk",
//     "meaning": "দুধ",
//     "pronunciation": "মিল্ক"
// }

 
const displayLevelWord = (word) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";

    if (word.length == 0) {
        wordContainer.innerHTML = `
        <div class="text-center space-y-2 col-span-full">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-sm text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-4xl font-semibold font-bangla">নেক্সট Lesson এ যান</h2>

        </div>
        `;
        return;
    }

    word.forEach(word => {
        console.log(word);
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class=" font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"} </h2>
        <p class="font-semibold">Meaning /Pronounciation</p>

        <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciatio পাওয়া যায়নি"}"</div>

        <div class="flex justify-between items-center">

          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info "></i></button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>

        </div>

      </div>
        `;

        wordContainer.append(card);
    })

    
}

const displayLesson = (lessons) => {
    
    // 1. get the container

        const levelContainer = document.getElementById("level-container");
        levelContainer.innerHTML = "";

    // 2. get into evey keasson
    for(let lesson of lessons) {

        // 3. creat element
        console.log(lesson);
        
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML =  `
            <button onclick="loadLeveWord(${lesson.level_no})" class="btn btn-outline btn-primary "
            ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
            </button>
            `;
        // 4. append into container

        levelContainer.append(btnDiv);

    }
  

    
};
loadLessons();