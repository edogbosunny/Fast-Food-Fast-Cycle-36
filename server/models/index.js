import createUserTable from './users';

const CreateTables = async () => {
  try {
    await createUserTable();
    console.log('Create User Table Init');
  } catch (e) {
    // throw e;
  }
};

export default CreateTables;
