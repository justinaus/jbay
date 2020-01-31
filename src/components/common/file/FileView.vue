<template>
  <div>
    <button @click="onClickFileDownload">File Download</button>
  </div>
</template>

<script>
import http from '@/services/http';
import { downloadFile } from 'jodash';
import { SHOW_ALERT_ACTION } from '@/store/modules/alert/action';

export default {
  methods: {
    onClickFileDownload() {
      // fake
      const path = `todos/1`;

      http
        .get(path, { responseType: 'arraybuffer' })
        .then(response => {
          downloadFile(response);
        })
        .catch(error => {
          this.$store.dispatch(SHOW_ALERT_ACTION, { text: String(error) });
        });
    },
  },
};</script
>\
