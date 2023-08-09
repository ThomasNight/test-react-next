import { useReducer } from "react";

type State = {
  firstName: string;
  lastName: string;
  extra: {
    age: number;
  };
};

type Action = {
  type: `firstNameChange` | `lastNameChange` | `ageChange`;
  payload: {
    value: string;
  };
};

function reducer(state: State, action: Action): State {
  const newState = { ...state, extra: { ...state.extra } };
  switch (action.type) {
    case `firstNameChange`: {
      newState.firstName = action.payload.value;
      break;
    }
    case `lastNameChange`: {
      newState.lastName = action.payload.value;
      break;
    }
    case `ageChange`: {
      newState.extra.age = Number.parseInt(action.payload.value);
      break;
    }
    default: {
      throw new Error(`Invalid action type`);
    }
  }
  return newState;
}

export const FormsPage = () => {
  const [form, dispatch] = useReducer(reducer, {
    firstName: "",
    lastName: "",
    extra: {
      age: 0,
    },
  });

  function onFirstNameChange(value: string) {
    dispatch({
      type: `firstNameChange`,
      payload: {
        value,
      },
    });
  }

  function onLastNameChange(value: string) {
    dispatch({
      type: `lastNameChange`,
      payload: {
        value,
      },
    });
  }

  function onAgeChange(value: string) {
    dispatch({
      type: `ageChange`,
      payload: {
        value,
      },
    });
  }

  return (
    <form action="/api/hello" method="post">
      <label>FirstName</label>
      <input
        name="firstName"
        value={form.firstName}
        onChange={(e) => onFirstNameChange(e.target.value)}
      />

      <label>LastName</label>
      <input
        name="lastName"
        value={form.lastName}
        onChange={(e) => onLastNameChange(e.target.value)}
      />

      <label>Age</label>
      <input
        type="number"
        name="age"
        value={form.extra.age}
        onChange={(e) => onAgeChange(e.target.value)}
      />

      <button type="submit">Save</button>
    </form>
  );
};

export default FormsPage;
