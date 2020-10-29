<template>
    <div class="md-layout">

    </div>
</template>
<script>
import { SlideYDownTransition } from "vue2-transitions";
import db from '@/firebase/init';
import firebase from 'firebase/app';
import debounce from "debounce";
import moment from "moment";
export default {
    name: 'wits',
    components: {
        SlideYDownTransition
    }
}
</script>