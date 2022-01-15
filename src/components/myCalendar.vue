<template>
<div>
  
  <button v-on:click="alertShow=false">test</button>
  <vue-cal
    :time-from="10 * 60"
    :time-to="23 * 60"
    :disable-views="['years', 'year']"
    :events="events"
    :editable-events="{
      title: true,
      drag: true,
      resize: true,
      delete: true,
      create: true,
    }"
    :on-event-create="onEventCreate"
    class="vuecal--full-height-delete vuecal--green-theme "
    today-button
    :snap-to-time="15"
  >
  <template v-slot:today-button>
    <v-tooltip>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">
          <p>today</p>
        </v-btn>
      </template>
    </v-tooltip>
  </template>
  </vue-cal>

  <v-dialog v-model="showEventCreationDialog" :persistent="true" max-width="420" >
    <v-card>
      <v-card-title>
        <v-text-field v-model="selectedEvent.title" placeholder="Event Title"/>
      </v-card-title>
      <v-card-text>
        <v-textarea v-model="selectedEvent.description" placeholder="Event Content"/>
        <v-layout>
          <v-select
            :items="eventsCssClasses"
            placeholder="Event CSS Class"
            @change="selectedEvent.class = $event"
            :value="selectedEvent.class"/>
          <v-switch v-model="selectedEvent.background" label="background Event"/>
        </v-layout>
        <v-layout>
          <v-btn @click="cancelEventCreation()">Cancel</v-btn>
          <v-btn @click="closeCreationDialog()">Save</v-btn>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-alert
    class="alert"
    :type="alert.type"
    :value="alertShow"
    width= "500px"
    :class="alert.type+'-alert'"
    transition="scale-transition"
  >
    {{alert.message}}

  </v-alert>
</div>

</template> 
<script>
import 'vue-cal/dist/drag-and-drop.js'
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
      selectedEvent: {},
      showEventCreationDialog: false,
      loadReady: false,
      c: new api(),
      days: [],
      events: [],
      eventsCssClasses: ['leisure', 'sport', 'health'],
      selectedDate: new Date(new Date().getFullYear(), 11, 31),
      alert:{
        message: '',
        type: '',
      },
      alertShow:false,
    };
  },
  computed: {},
  methods: {
    onEventCreate(event , deleteEventFunction) {
      this.selectedEvent = event;
      this.showEventCreationDialog = true;
      this.deleteEventFunction = deleteEventFunction;
      console.log(event);
      return event;
    },
    cancelEventCreation() {
      this.closeCreationDialog();
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
        updated_at: '',
        deleted_at: ''
      }
      this.axios.post(`${this.c.createEvent}` , eventToUpload , {headers: this.c.headers}).then(res=>{
        console.log(res);
      }).catch(error =>{
        console.log(error);
      })
      this.selectedEvent = {};
    },
    showAlert(alert){
      this.alert = alert;
      this.alertShow = true;
      setTimeout(()=>{this.alertShow = false} , 5000);
    }
  },
  created: function () {
    console.log(this.c.createEvent);
    this.showAlert({message:'this works' , type:'info'});
    this.axios
      .post(`${this.c.listURL}`, {}, { headers: this.c.headers })
      .then((res) => {
        console.log(res);
        if(res.data.success){
          this.events = res.data.return.docs;
        }
      });
  },
};
</script>
<style scoped>
.alert{
  position: fixed;
  bottom: 0;
  right:50px;
}
.error-alert{
  background-color: red !important;
  color: black !important;
}

.info-alert{
  background-color: indigo !important;
  color: white !important;

}

.success-alert{
  background-color: #42b983 !important ;
  color: white !important;
}
</style>