import {AsyncStorage} from 'react-native';
import {database, auth, f} from '../../ConfigFirebase';

const addNewFamily = async (_familyData, _membersFamily, _food_activity) => {
  try {
    let memebersID = [];
    let familyData =
      _familyData || JSON.parse(await AsyncStorage.getItem('familyData'));
    //familyData = JSON.parse(familyData)
    let membersFamily =
      _membersFamily || JSON.parse(await AsyncStorage.getItem('membersFamily'));
    //membersFamily = JSON.parse(membersFamily)
    let food_activity =
      _food_activity || JSON.parse(await AsyncStorage.getItem('food_activity'));
    let foodActivitiesId = food_activity ? food_activity.map(({id}) => id) : [];
    let foodActivityInfos = food_activity
      ? food_activity.map(({title, detail}) => ({
          title,
          detail,
          createdAt: f.database.ServerValue.TIMESTAMP,
        }))
      : [];
    if (familyData && membersFamily && food_activity) {
      console.log(membersFamily, 'MEMBER FAMILY ADD NEW FAMILY');
      foodActivitiesId.createdAt = f.database.ServerValue.TIMESTAMP;
      database
        .ref('family')
        .push({
          ...familyData,
          food_activity: foodActivitiesId,
        })
        .once('value', function(snapshot) {
          membersFamily.map(member => {
            member.familyID = snapshot.key;
            member.familyUuid = familyData.uuid;
            // member.food_activity = foodActivitiesId
            database
              .ref('members')
              .push({
                ...member,
                foodActivity: foodActivityInfos,
              })
              .once('value', async _member => {
                memebersID.push(_member.key);
                await database
                  .ref('food_activity')
                  .child(auth.currentUser.uid)
                  .push({
                    foodActivity: foodActivityInfos,
                  });
              });
            AsyncStorage.removeItem('familyData');
            AsyncStorage.removeItem('membersFamily');
            AsyncStorage.removeItem('food_activity');
          });
        });
    }
  } catch (e) {
    console.error(e);
  }
};

const editMember = async (
  familyId,
  _familyData,
  _membersFamily,
  _food_activity,
  _qrCodeID,
  memberID,
) => {
  try {
    console.log(_membersFamily, 'MEMBER FAMILY EDIT MEMBER');
    let memebersID = [];
    let familyData =
      _familyData || JSON.parse(await AsyncStorage.getItem('familyData'));
    //familyData = JSON.parse(familyData)
    let membersFamily =
      _membersFamily[0] ||
      JSON.parse(await AsyncStorage.getItem('membersFamily'));
    //membersFamily = JSON.parse(membersFamily)
    database
      .ref('members')
      .child(memberID)
      .set({
        ...membersFamily,
        familyUuid: _qrCodeID,
        familyID: familyId,
      });
    // }
  } catch (e) {
    console.error(e);
  }
};

const editFamilyFood = async (familyID, foodActivity) => {
  let foodActivitiesId = foodActivity ? foodActivity.map(({id}) => id) : [];
  try {
    database
      .ref('family/' + familyID)
      .child('food_activity')
      .set({
        ...foodActivitiesId,
      });
  } catch {
    console.error(e);
  }
};

const editMemberFood = (memberID, foodActivity) => {
  try {
    database
      .ref('members/' + memberID)
      .child('foodActivity')
      .set({
        ...foodActivity,
      });
  } catch {
    console.error(e);
  }
};

const editFamily = async (
  familyId,
  _familyData,
  _membersFamily,
  _food_activity,
  _qrCodeID,
  memberID,
) => {
  try {
    console.log(_membersFamily, 'MEMBER FAMILY EDIT FAMILY');
    let memebersID = [];
    let familyData =
      _familyData || JSON.parse(await AsyncStorage.getItem('familyData'));
    //familyData = JSON.parse(familyData)
    let membersFamily =
      _membersFamily[0] ||
      JSON.parse(await AsyncStorage.getItem('membersFamily'));
    //membersFamily = JSON.parse(membersFamily)
    let food_activity =
      _food_activity || JSON.parse(await AsyncStorage.getItem('food_activity'));
    let qrCodeID = _qrCodeID;

    let foodActivitiesId = food_activity ? food_activity.map(({id}) => id) : [];
    let foodActivityInfos = food_activity
      ? food_activity.map(({title, detail}) => ({
          title,
          detail,
        }))
      : [];

    // if (familyData && qrCodeID&& membersFamily) {
    if (memberID === undefined) {
      database.ref('members').push({
        ...membersFamily,
        familyID: familyId,
        familyUuid: _qrCodeID,
        foodActivity: _food_activity,
      });
    } else {
      database
        .ref('family')
        .child(familyId)
        .set({
          //il manque le project title!!
          ...familyData,
          food_activity: foodActivitiesId,
          uuid: qrCodeID,
        });
      let IDMember;
    }
  } catch (e) {
    console.error(e);
  }
};

const getActivityFoodData = async (health_area, callback) => {
  const healthAreaOfAcfOwner = health_area;
  let healthAreaOfAcfOwnerObjects = [];
  let foodActivity = [];
  let foodActivityKey = [];
  database.ref('health_area').once('value', async snap => {
    healthAreaOfAcfOwnerObjects = [].concat(
      ...Object.values(snap.val())
        .filter(_area => {
          return healthAreaOfAcfOwner.indexOf(_area.name) > -1;
        })
        .map(obj => obj.food),
    );

    const getData = async () => {
      return Promise.all(
        healthAreaOfAcfOwnerObjects.map(async foodID => {
          return await database
            .ref('food')
            .child(foodID)
            .once('value');
        }),
      );
    };

    await getData().then(promise => {
      promise.map((p, index) => {
        foodActivity.push(p.val());
        foodActivityKey.push(p.key);
      });

      callback && callback(foodActivity, foodActivityKey);
    });
    await AsyncStorage.setItem(
      'health_area_food_activity',
      JSON.stringify(foodActivity),
    );
    await AsyncStorage.setItem(
      'health_area_food_activity_key',
      JSON.stringify(foodActivityKey),
    );
  });
};

const projectData = async (idAcfOwner, callback) => {
  database
    .ref('acf_owner')
    .child(idAcfOwner)
    .once('value', async snap => {
      let dataAcfOwner = snap.val();
      if (dataAcfOwner) {
        let healthAreaOfAcfOwner = Object.values(
          dataAcfOwner && dataAcfOwner.health_area,
        );
        let projectsId = [];

        database.ref('health_area').once('value', async snap => {
          projectsId = Object.values(snap.val())
            .filter(area => {
              return healthAreaOfAcfOwner.indexOf(area.name) > -1;
            })
            .map(area => {
              return area.project;
            });
          let promises = [];
          promises = projectsId.map(_projectsId => {
            return database
              .ref('project')
              .child(_projectsId)
              .once('value');
          });
          Promise.all(promises).then(async function(values) {
            const resultProject = values.map(value => value.val());
            await AsyncStorage.setItem(
              'projectArea',
              JSON.stringify(resultProject),
            );
            callback && callback(resultProject);
          });
        });
      } else {
        console.log('grosse erreur');
      }
    });
};

export {
  addNewFamily,
  editFamily,
  getActivityFoodData,
  projectData,
  editMember,
  editFamilyFood,
  editMemberFood,
};
