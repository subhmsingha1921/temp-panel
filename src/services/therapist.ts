import { db, collection, getDocs, Timestamp } from "../libraries/firebase";
import { THERAPIST } from "../constants/collection";
import { getAge, getAvatar } from "../utils/helper";

export const fetchTherapists = async (
  setTherapistList: (arg0: any[]) => void
) => {
  try {
    const therapistRef = collection(db, THERAPIST);

    const querySnapshot = await getDocs(therapistRef);

    let therapists: {
      key: string;
      photo: string;
      age: number;
    }[] = [];
    querySnapshot.docs.forEach((d) => {
      const therapistData = d.data();

      therapists.push({
        ...therapistData,
        key: d.id,
        photo: getAvatar(therapistData["name"]),
        age: getAge(therapistData["dob"].toDate()),
      });
    });

    setTherapistList(therapists);
  } catch (error) {
    console.log(error);
  }
};
