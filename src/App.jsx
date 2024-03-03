import "./App.css";
import Task from "./components/task/Task";
import { useState, useRef, useEffect } from "react";

export default function App() {
  // State
  const [tasks, setTasks] = useState([
    {
      content: "Séduire un employé d'Umbrella travaillant au manoir Spencer.",
      done: true,
    },
  ]);
  // Ref --------------------------------------------------------------------------------------------
  const input = useRef("");

  // Cycle --------------------------------------------------------------------------------------------
  useEffect(() => {
    input.current.focus();
  }, []);
  // Function ----------------------------------------------------------------------------------------

  // pour passer de true à false et inversement
  const doneClikedHandler = (index) => {
    // quand on clique
    const newTasks = [...tasks]; // newtasks est une copie de la const tasks
    // L'index en paramètre permet de sélectionner quel élément va etre changer
    // La valeur de done est alors inversée grace au !
    newTasks[index].done = !tasks[index].done;
    setTasks(newTasks); // On envoie la nouvelle valeur à tasks
  };

  const removeClikedHandler = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1); // Splice pour supprimer à partir de l'index indiqué, le 2e paramètre indique le nombre d'éléments à supprimer
    setTasks(newTasks);
  };

  /* 
    Pourquoi la page s'actualise et efface ce que l'on vient d'inscrire quand on envoie un formulaire ?
    Parce que c'est la comportement quand on envoie les données d'un formulaire.
    Pour éviter ce problème, on envoie l'évènement.
    form onSubmit={(e) => submittedTaskHandler(e)}
    e.preventDefault()
    */
  const submittedTaskHandler = (e) => {
    e.preventDefault();// <--
    console.log(input.current.value);

    if(input.current.value != "" && input.current.value != " "){
      const newTask = { // Ici, on crée une nouvelle tache
        content: input.current.value,
        done: false,
      };
      
      // Ici, on ajoute la nouvelle tache à celles déjà existantes
      setTasks([...tasks, newTask]);// On prend le contenu de tasks avec le spread operator "...tasks" et on ajoute newTask
      input.current.value = "";

      //Il est possible aussi d'ajouter d'abord newTask   setTasks([newTask, ...tasks ]);
    }
  };
  return (
    <>
      <div className="App">
        <header>
          <span>Missions à accomplir</span>
        </header>

        <div className="add">
          {/* On détecte l'envoi du formulaire grace à onSubmit */}
          <form onSubmit={(e) => submittedTaskHandler(e)}>
            <input
              type="text"
              placeholder="Que souhaitez-vous ajouter ?"
              ref={input}
            />
            <button type="submit">Ajouter</button>
          </form>
        </div>
        <section>
          {tasks.map((task, index) => (
            <Task
            key={index}
            content={task.content}
            done={task.done}
            doneCliked={() => doneClikedHandler(index)}
            removeClicked={() => removeClikedHandler(index)}
            />
            ))}
        </section>
      </div>

      {/* Les codes d'en dessous fonctionnent aussi */}
      {/*tasks.map((task, index) => <Task />)*/}
      {/*
      {tasks.map((task, index) => (
         <Task key={index} />
      ))}
*/}
      {/*
      {tasks.map((task, index) => {
       return  <Task key={index} />;
      })}
*/}
    </>
  );
}
