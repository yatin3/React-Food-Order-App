import { useEffect,useState } from "react";
import "./AvailableMeals.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";


const AvailableMeals = () => {

   const [meals,setMeals] = useState([]);
   const [isLoading,setIsLoading] = useState(true);
   const [httpError,sethttpError] = useState();

  useEffect(()=>{
    const fetchMeals = async ()=>{
    const response =  await fetch("https://react-basic-database-default-rtdb.firebaseio.com/meals.json");

    if (!response.ok){
      throw new Error('Something went wrong!');
    }

    console.log(response);
    const responseData = await response.json();
    console.log("ahead")
    const loadedMeals = [];

    for(const key in responseData){
      loadedMeals.push({
        id: key,
        name:responseData[key].name,
        description:responseData[key].description,
        price:responseData[key].price
      });
    }
    setMeals(loadedMeals);
    setIsLoading(false);
  };

  fetchMeals().catch((error)=>{
    setIsLoading(false);
    sethttpError(error.message);
  });
  },[]);

  if (isLoading){
    return <section className="mealsLoading">
      <p>Loading...</p>
    </section>
  }

  if(httpError){
    return <section className="mealsError">
      <p>{httpError}</p>
    </section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className="meals">
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
