import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function FullPizza() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://62d057061cc14f8c0888fda2.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Пицца не найдена');
        navigate('/');
      }
    }
    fetchPizza();
  }, [id]);

  if (!pizza) {
    return 'Загрузка';
  } else {
    return (
      <div>
        <img src={pizza.imageUrl} alt="img" />
        <h2>{pizza.title}</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores corporis cumque deserunt
          asperiores veritatis enim error nam perferendis debitis quo dolor, cupiditate amet hic
          consectetur velit aliquam est? Ea, tempore?
        </p>
      </div>
    );
  }
}

export default FullPizza;
