function HabitLista({ rutiner }) {
  return (
    <div className="rutinCard">
      <h1>rutiner</h1>
      <ul>
        {rutiner.map((rutin) => (
          <li key={rutin.id}>
            {rutin.title}. Prioritet är:({rutin.Prioritet}) gör det(
            {rutin.Repetitioner}) gånger.
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitLista;
