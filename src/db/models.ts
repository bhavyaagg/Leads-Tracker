import Sequelize, {Model} from 'sequelize'
const CONFIG = require('../../config')


const db = new Sequelize(CONFIG.DATABASE_URL);

const User = db.define('user', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
  , name: Sequelize.STRING
  , email: Sequelize.STRING
  , contact: Sequelize.STRING
  , designation: Sequelize.STRING
  , centre: Sequelize.STRING
});

const Lead = db.define('lead', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
  , name: {type: Sequelize.STRING, allowNull: false}
  , email: {type: Sequelize.STRING, allowNull: false}
  , contact: {type: Sequelize.STRING, allowNull: false}
  , dob: Sequelize.STRING
  , gaurdianName: Sequelize.STRING
  , gaurdianContact: Sequelize.STRING
  , gaurdianEmail: Sequelize.STRING
  , college: Sequelize.STRING
  , branch: Sequelize.STRING
  , university: Sequelize.STRING
  , collegeBatch: Sequelize.STRING
  , address: Sequelize.STRING
  , city: Sequelize.STRING
  , state: Sequelize.STRING
  , pincode: Sequelize.STRING
  , coursesOfInterest: Sequelize.ARRAY(Sequelize.INTEGER)
  , centresOfInterest: Sequelize.ARRAY(Sequelize.INTEGER)
  , referrer: Sequelize.ARRAY(Sequelize.STRING)
  , VMCRollNumber: Sequelize.STRING
  , CBRollNumber: Sequelize.STRING
  , cbStudentReferral: Sequelize.JSON
  /*
   Expected Structure:
   {
   id: Sequelize.STRING
   , name: Sequelize.STRING
   }
   */
  , status: {type: Sequelize.ENUM('new','interested','uninterested','enrolled','untracked'), allowNull: false, defaultValue:'new'}
});

const OneAuth = db.define('authtoken',{
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    oneauthId: Sequelize.INTEGER,
    oneauthToken: Sequelize.STRING,
    token: Sequelize.STRING
});

OneAuth.belongsTo(User);
User.hasMany(OneAuth);

const Comment = db.define('comment', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
  , comment: Sequelize.STRING(1234)
});

Comment.belongsTo(Lead);
Comment.belongsTo(User);
Lead.hasMany(Comment);
User.hasMany(Comment);

const Centre = db.define('centre', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
  , name: {type: Sequelize.STRING, allowNull: false, unique: true}
});

const Course = db.define('course', {
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}
  , name: {type: Sequelize.STRING, allowNull: false, unique: true}
});

const models = {
    User: User
    , Lead: Lead
    , Comment: Comment
    , Centre: Centre
    , Course: Course
    , Oneauth: OneAuth
};

export default db;
export {models}
