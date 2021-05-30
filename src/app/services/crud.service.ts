import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  CollectionReference,
  Query,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

/**
 * General reusable CRUD service
 */
@Injectable({
  providedIn: 'root',
})
export class CrudService<T extends { id?: string }> {
  constructor(private afs: AngularFirestore) {}

  /**
   * Async add function to the firestore database
   * @param collectionName name of the firestore collection
   * @param data the stored object
   * @param id the id of that object if it has one
   * @returns the id of the object for debugging purposes
   */
  async add(collectionName: string, data: T, id?: string): Promise<string> {
    const uid = id ? id : this.afs.createId();
    data.id = uid;
    await this.afs.collection(collectionName).doc(uid).set(data);
    return uid;
  }

  /**
   * Getter for firestore collection, if type and search term exists
   *  only return the values matching it
   * @param collectionName name of the firestore collection
   * @param orderBy the parameter the list gets ordered by
   * @param type the object parameter we are searching for
   * @param search the searched value of that parameter
   * @returns an Observable array of the stored object type
   */
  get(
    collectionName: string,
    orderBy: string,
    type?: string,
    search?: any
  ): Observable<T[]> {
    if (type && search) {
      return this.afs
        .collection(collectionName, (ref) => {
          let query: CollectionReference | Query = ref;
          query = query
            .where(type, '>=', search)
            .where(type, '<=', search + '\uf8ff')
            .orderBy(orderBy, 'asc');
          return query;
        })
        .valueChanges() as Observable<T[]>;
    } else {
      return this.afs
        .collection(collectionName, (ref) => {
          let query: CollectionReference | Query = ref;
          query = query.orderBy(orderBy, 'asc');
          return query;
        })
        .valueChanges() as Observable<T[]>;
    }
  }

  /**
   * Gets a stored object by ID
   * @param collectionName name of the firestore collection
   * @param id the id of the object
   * @returns an Observable<any> containing the object
   */
  getById(collectionName: string, id: string): Observable<any> {
    return this.afs.collection(collectionName).doc(id).valueChanges();
  }

  /**
   * Updates the firestore object on ID with the data object
   * @param collectionName name of the firestore collection
   * @param id the id of the object
   * @param data an object with the updated parameters
   */
  update(collectionName: string, id: string, data: T): Promise<void> {
    return this.afs.collection(collectionName).doc(id).update(data);
  }

  /**
   * Deletes an object from firestore by ID
   * @param collectionName name of the firestore collection
   * @param id the id of the object
   */
  delete(collectionName: string, id: string): Promise<void> {
    return this.afs.collection(collectionName).doc(id).delete();
  }
}
