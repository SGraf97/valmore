<template>


 <div>
   <myCalendar data-app  />

 </div>
</template>

<script>
// import Calendar from 'v-calendar/lib/components/calendar.umd'
// import DatePicker from 'v-calendar/lib/components/date-picker.umd'
import myCalendar from './components/myCalendar.vue';

export default {
  name: 'App',
  components: {
    myCalendar
  },
  data: function (){
    return{
      days: []
    }
  },
  computed: {
    dates() {
      return this.days.map(day => day.date);
    },
    attributes(){
      return this.dates.map(date => ({
        highlight: true,
        dates: date,
      }));
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


</style>

