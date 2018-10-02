import createUserTable from './users';
import createMealTable from './Foodmeal';
import createOrderTable from './orders';

const CreateTables = async () => {
  try {
    await createUserTable();
    console.log('Create User Table ==> Init');

    await createMealTable();
    console.log('Food-Meal Table ==> Init');

    await createOrderTable();
    console.log('Order Table ==> Init');
  } catch (e) {
    throw e;
  }
};

export default CreateTables;
