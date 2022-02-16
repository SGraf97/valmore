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

html, body, input, textarea, select, button {
    background-color: rgb(19, 21, 22);
    border-color: #736b5e;
    color: #e8e6e3;
}

h1 , h2 , h3 , h4 ,h5, h6 , button , input , p , a ,span , .vuecal__no-event , .event-title--edit , div{
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif !important;
  color:white;
}
</style>

