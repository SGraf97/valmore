<template>
  <div>
    <vue-cal
      style="height: 1000px"
      :time="false"
      :disable-views="['years', 'year']"
      :events="events"
      editable-events
      :on-event-create="onEventCreate"
      class="vuecal--green-theme"
      today-button
      :snap-to-time="15"
      :drag-to-create-event="false"
      
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
      selectedEvent: {},
      showEventCreationDialog: false,
      loadReady: false,
      c: new api(),
      days: [],
      events: [
        {
          start: '2022-01-12 10:00:00',
          end: '2022-01-12 10:30:00',
          title: '1',
          content: '1',
          class: 'primary'
        },
        {
          start: '2022-01-12 10:00:00',
          end: '2022-01-12 10:45:00',
          title: '2',
          content: '2',
          class: 'info'
        },
        {
          start: '2022-01-12 10:00:00',
          end: '2022-01-12 11:00:00',
          title: '3',
          content: '3',
          class: 'warning'
        },
        {
          start: '2022-01-12 09:59:59',
          end: '2022-01-12 11:00:01',
          title: '4',
          content: '4',
          class: 'danger'
        }
      ],
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
    onEventCreate(event, deleteEventFunction) {
      this.selectedEvent = event;
      this.showEventCreationDialog = true;
      this.deleteEventFunction = deleteEventFunction;
      console.log(event);
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

    convertEvent(event){
      var returnedEvent = {
        class : 'primary',
        start : event.created_at.split('T')[0] + ' ' + event.created_at.split('T')[1].split('.')[0],
        end : event.created_at.split('T')[0] + ' ' + event.created_at.split('T')[1].split('.')[0],
        title: event.event_name,
        content: event.event_description,
      }
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
          for (var i of res.data.return.docs){
            this.events.push(this.convertEvent(i));
            console.log(this.events);
          }
          // this.events = res.data.return.docs;
        }
      });
  },
};
</script>
<style scoped>
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
</style>
