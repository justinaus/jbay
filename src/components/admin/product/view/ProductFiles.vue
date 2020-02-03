<template>
  <div>
    <FileView />
    <FileWrite />
  </div>
</template>

<script>
import FileView from '@/components/common/file/FileView';
import FileWrite from '@/components/common/file/FileWrite';

export default {
  components: {
    FileView,
    FileWrite,
  },
};
</script>
