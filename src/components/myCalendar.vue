<template>
<div>

  <vue-cal
    :time-from="10 * 60"
    :time-to="23 * 60"
    :disable-views="['years', 'year']"
    hide-view-selector
    :events="events"
    :editable-events="{
      title: true,
      drag: true,
      resize: true,
      delete: true,
      create: true,
    }"
    :on-event-create="onEventCreate"
    class="vuecal--full-height-delete"
  />
  <v-dialog v-model="showEventCreationDialog" :persistent="true" max-width="420">
  <v-card>
    <v-card-title>
      <v-text-field v-model="selectedEvent.title" placeholder="Event Title"/>
    </v-card-title>
    <v-card-text>
      <v-textarea v-model="selectedEvent.content" placeholder="Event Content"/>
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
</div>

</template>
<script>
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
      selectedEvent: null,
      showEventCreationDialog: false,
      loadReady: false,
      c: new api(),
      days: [],
      events: [],
    };
  },
  computed: {},
  methods: {
    onEventCreate(event , deleteEventFunction) {
      this.selectedEvent = event;
      this.showEventCreationDialog = true;
      this.deleteEventFunction = deleteEventFunction;

      return event;
    },
    cancelEventCreation() {
      this.closeCreationDialog();
      this.deleteEventFunction();
    },
    closeCreationDialog() {
      this.showEventCreationDialog = false;
      this.selectedEvent = {};
    },
  },
  created: function () {
    console.log(this.c.createEvent);
    this.axios
      .post(`${this.c.listURL}`, {}, { headers: this.c.headers })
      .then((res) => {
        console.log(res);
      });
  },
};
</script>
