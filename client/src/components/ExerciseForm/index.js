import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_EXERCISE } from '../../utils/mutations';
import { QUERY_EXERCISES, QUERY_ME } from '../../utils/queries';
import image from '../../assets/walking.jpg';

import Auth from '../../utils/auth';

const ExerciseForm = () => {
  const [exerciseDesc, setExerciseText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addExercise, { error }] = useMutation(ADD_EXERCISE, {
    update(cache, { data: { addExercise } }) {
      try {
        const { exercises } = cache.readQuery({ query: QUERY_EXERCISES });

        cache.writeQuery({
          query: QUERY_EXERCISES,
          data: { exercises: [addExercise, ...exercises] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, exercises: [...me.exercises, addExercise] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addExercise({
        variables: {
          exerciseDesc,
          exerciseUser: Auth.getProfile().data.username,
        },
      });

      setExerciseText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'exerciseDesc' && value.length <= 280) {
      setExerciseText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="exerciseDesc"
                placeholder="Enter exercise description"
                value={exerciseDesc}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn-add btn-primary btn-block py-3" type="submit">
                Add
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <span>
          <img className="img-position" src={image} width="1200" height="700" alt="Image" />
          <span className="span-position">Please log in to your profile or sign up to start tracking your workouts.{' '}
          <Link to="/login">Login</Link> or <Link to="/signup">Signup.</Link>
          </span>
        </span>
      )}
    </div>
  );
};

export default ExerciseForm;
