<template>
  <div>
    <input
      type="file"
      :id="_uid"
      @change="onFileChange"
      :multiple="canMultiple"
    />
  </div>
</template>

<script>
import http from '@/services/http';
import { SHOW_ALERT_ACTION } from '@/store/modules/alert/action';

export default {
  props: {
    canMultiple: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      this.uploadFiles(files);

      // if( !this.invalidFileExtension ) {
      //   this.uploadFiles( files );
      //   return;
      // }

      // this.checkValidFile( files, e.target );
    },
    async uploadFiles(files) {
      // fake
      const path = `todos/1`;

      var formData = new FormData();

      for (var i = 0; i < files.length; ++i) {
        formData.append('file', files[i]);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      http
        .post(path, formData, config)
        .then(response => {
          console.log('upload success');
        })
        .catch(error => {
          this.$store.dispatch(SHOW_ALERT_ACTION, { text: String(error) });
        });
    },
  },
};</script
>\
