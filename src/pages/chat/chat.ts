import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
// import { AngularFireDatabase } from 'angularfire2/database';


/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  username:string='';
  message:string='';
  _chatSubscription
  messages:object[]=[];

  constructor(public db:AngularFirestore,
    public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.navParams);
    this.username=this.navParams.get('username');
    this._chatSubscription=this.db.collection('/chat').valueChanges().subscribe(data => {
      data.map(elem=>{
        this.messages.push(elem);
      })
    });
  }

  sendMessage(){
    this.db.collection('/chat').add({
      username: this.username,
      message: this.message
    }).then(()=>{

    }).catch(()=>{

    })
    this.message="";
  }

  // ionViewDidLoad() {
  //   this.db.collection('/chat').add({
  //     specialMessage: true,
  //     message: `${this.username} has joined the room`
  //   });
  // }

  // ionViewWillLeave(){
  //   this._chatSubscription.unsubscribe();
  //   this.db.collection('/chat').add({
  //     specialMessage: true,
  //     message: `${this.username} has left the room`
  //   });
  // }
}
