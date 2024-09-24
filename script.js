// Variables to store total calories and workouts
let totalCalories = 0;
const workouts = [];
const meals = {
    Breakfast: [],
    Lunch: [],
    Dinner: []
};

// Add new meal
document.getElementById('meal-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const mealType = document.getElementById('meal-type').value;
    const mealName = document.getElementById('meal-name').value;
    const calories = parseInt(document.getElementById('calories').value);

    if (!mealName || isNaN(calories)) {
        alert("Please enter valid meal details.");
        return;
    }

    // Add meal to the appropriate meal type
    meals[mealType].push({ name: mealName, calories: calories });
    updateTotalCalories(calories);
    displayMeals(mealType);
    document.getElementById('meal-form').reset();
});

// Update total calories
function updateTotalCalories(calories) {
    totalCalories += calories;
    document.getElementById('total-calories').innerText = totalCalories;
}

// Display meals for a specific type (breakfast, lunch, dinner)
function displayMeals(mealType) {
    let mealOutput = `${mealType}: `;
    meals[mealType].forEach(meal => {
        mealOutput += `${meal.name} (${meal.calories} kcal), `;
    });
    document.getElementById(mealType.toLowerCase() + '-meals').innerText = mealOutput;
}

// Add new workout
document.getElementById('add-workout-btn').addEventListener('click', function () {
    const workoutName = prompt("Enter workout name:");
    if (!workoutName) return;

    const newWorkout = {
        name: workoutName,
        exercises: []
    };
    workouts.push(newWorkout);
    displayWorkouts();
});

// Display workout plans
function displayWorkouts() {
    const workoutList = document.getElementById('workout-list');
    workoutList.innerHTML = '';
    
    workouts.forEach((workout, index) => {
        const workoutItem = document.createElement('li');
        workoutItem.innerHTML = `
            ${workout.name}
            <button onclick="addExercise(${index})">Add Exercise</button>
            <button onclick="deleteWorkout(${index})">Delete</button>
        `;
        workoutList.appendChild(workoutItem);
    });
}

// Add exercise to a workout
function addExercise(workoutIndex) {
    const exerciseName = prompt("Enter exercise name:");
    const sets = parseInt(prompt("Enter sets:"));
    const reps = parseInt(prompt("Enter reps:"));

    if (!exerciseName || isNaN(sets) || isNaN(reps)) {
        alert("Please enter valid exercise details.");
        return;
    }

    workouts[workoutIndex].exercises.push({ name: exerciseName, sets: sets, reps: reps });
    displayWorkouts();
}

// Delete a workout
function deleteWorkout(workoutIndex) {
    workouts.splice(workoutIndex, 1);
    displayWorkouts();
}
