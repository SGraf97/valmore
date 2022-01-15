<template>
  <div>
    <vue-cal
      style="height: 1000px"
      :time="false"
      :disable-views="['years', 'year']"
      :events="events"
      editable-events
      :on-event-create="onEventCreate"
      :on-event-click="onEventClick"
      today-button
      :snap-to-time="15"
      :drag-to-create-event="false"
      class=" vuecal--green-theme"
    >
      <template v-slot:today-button>
        <v-tooltip>
          <template v-slot:activator="{ on }">
            <v-btn  class = "today-btn" depressed v-on="on">
              today
            </v-btn>
          </template>
        </v-tooltip>
      </template>
    </vue-cal>
    <v-dialog
      v-model="showEventCreationDialog"
      :persistent="true"
      max-width="420"
    >
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="selectedEvent.title"
            placeholder="Event Title"
          />
        </v-card-title>
        <v-card-text>
          <v-textarea
            v-model="selectedEvent.description"
            placeholder="Event Content"
          />
          <v-layout>
            <v-btn @click="cancelEventCreation()">Cancel</v-btn>
            <v-btn @click="closeCreationDialog()">Save</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog  v-model="editEventShow" >
        
        <template v-slot:default="dialog" >
          <v-card>
            <v-toolbar
              style="background-color:#42b983;color:white"
            ><h1>{{selectedEvent.title}}</h1></v-toolbar>
            <v-card-text>
              <p class="text-h2 pa-12">{{selectedEvent.content}}</p>
            </v-card-text>
            <div class="buttons-dialog">
              <v-btn
                style="background-color:#1976D2;color:white"
                text
                @click="dialog.value = false"
              >Save</v-btn>
              <v-btn
                style="background-color:#F44336;color:white"
                text
                @click="deleteEvent()"
              >Delete Event</v-btn>
            </div>
          </v-card>
        </template>
    </v-dialog>
    <v-alert
      class="alert"
      :type="alert.type"
      :value="alertShow"
      width="500px"
      :class="alert.type + '-alert'"
      transition="scale-transition"
    >
      {{ alert.message }}
    </v-alert>
  </div>
</template>
<script>
import "vue-cal/dist/drag-and-drop.js";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import api from "../configs";

export default {
  name: "myCalendar",
  components: {
    VueCal,
  },
  data() {
    return {
      editEventShow:true,
      selectedEvent: {},
      showEventCreationDialog: false,
      loadReady: false,
      c: new api(),
      days: [],
      events: [],
      eventsCssClasses: ["leisure", "sport", "health"],
      selectedDate: new Date(new Date().getFullYear(), 11, 31),
      alert: {
        message: "",
        type: "",
      },
      alertShow: false,
    };
  },
  computed: {},
  methods: {
    onEventClick(event , e){
      this.selectedEvent = event;
      this.editEventShow = true;

      e.stopPropagation();
    },

    deleteEvent(){
      this.axios.delete(`${this.c.deleteEvent}${this.selectedEvent._id}` , {headers: this.c.headers}).then(res=>{
          console.log(res);
          if(res.data.success){
             this.showAlert({ message: res.data.message, type: "success" });
          }else{
            this.showAlert({ message: res.data.message, type: "error" });
          }
          this.editEventShow = false;
        }).catch(error=>{
          this.showAlert({ message: error, type: "error" });
          this.editEventShow = false;
        });
        this.events = this.events.filter((val)=>{
          return val._id != this.selectedEvent._id;
        });
        this.selectedEvent = {};
        this.deleteEventFunction();
    },

    onEventCreate(event, deleteEventFunction) {
      this.selectedEvent = event;
      this.showEventCreationDialog = true;
      this.deleteEventFunction = deleteEventFunction;
      console.log(this.deleteEventFunction);
      return event;
    },

    cancelEventCreation() {
      this.showEventCreationDialog = false;
      this.deleteEventFunction();
    },

    closeCreationDialog() {
      this.showEventCreationDialog = false;
      console.log(this.selectedEvent);
      var eventToUpload = {
        event_name: this.selectedEvent.title,
        event_description: this.selectedEvent.description,
        event_date: this.selectedEvent.start,
        // created_by:
        created_at: Date.now(),
        updated_at: "",
        deleted_at: "",
      };
      this.axios
        .post(`${this.c.createEvent}`, eventToUpload, {
          headers: this.c.headers,
        })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.showAlert({ message: res.data.message, type: "success" });
          } else {
            this.showAlert({ message: res.data.message, type: "error" });
            this.deleteEventFunction();
          }
        })
        .catch((error) => {
          this.showAlert({ message: error.message, type: "error" });
          console.log(error);
        });
      this.selectedEvent = {};
    },

    convertEvent(event) {
      var returnedEvent = {
        _id : event._id,
        class: "primary",
        start:
          event.event_date.split("T")[0] +
          " " +
          event.event_date.split("T")[1].split(".")[0],
        end:
          event.event_date.split("T")[0] +
          " " +
          event.event_date.split("T")[1].split(".")[0],
        title: event.event_name,
        content: event.event_description,
      };
      return returnedEvent;
    },

    showAlert(alert) {
      this.alert = alert;
      this.alertShow = true;
      setTimeout(() => {
        this.alertShow = false;
      }, 5000);
    },
  },

  created: function () {
    console.log(this.c.createEvent);
    this.axios
      .post(`${this.c.listURL}`, {}, { headers: this.c.headers })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          console.log(res.data);
          for (var i of res.data.return.docs) {
            this.events.push(this.convertEvent(i));
            // console.log(this.events);
          }
          // this.events = res.data.return.docs;
        }
      });
  },
};
</script>
<style>
.alert {
  position: fixed;
  bottom: 0;
  right: 50px;
}
.error-alert {
  background-color: red !important;
  color: white !important;
}

.info-alert {
  background-color: indigo !important;
  color: white !important;
}

.success-alert {
  background-color: #42b983 !important ;
  color: white !important;
}


:root{
  --primary:#1976D2;
  --secondary: #4242421a;
  --accent: #82B1FF;
  --info: #2196F3;
}

.vuecal__event{
  margin-top:15px;
  border:3px solid#42b983 ;
  border-radius: 8px;
  background-color: #c6ffe5;
}

.today-btn{
  background-color:#42b983 !important;
  color: white !important;
}

.vuecal__event-title{
  /* border :10px solid white;
  border: 10px; */
  padding: 10px;
  text-align: left;
  letter-spacing: 2px;
  font-weight: bold;
  /* color: aliceblue; */
}

.vuecal__event-content{
  border-top: 1px solid var(--secondary);
  padding: 10px;
  text-align: left;
}

.buttons-dialog{
  display: flex;
  justify-content: space-between;
  /* width: fit-content; */
  padding: 2%;
}
.pa-12{
  font-size: 120%;
  padding: 15px;
}
</style>
