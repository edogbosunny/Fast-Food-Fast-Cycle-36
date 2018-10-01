import createUserTable from './users';
import createMealTable from './Foodmeal';

const CreateTables = async () => {
  try {
    await createUserTable();
    console.log('Create User Table Init');
    await createMealTable();
    console.log('Food-Meal Table Init');
  } catch (e) {
    throw e;
  }
};

export default CreateTables;
