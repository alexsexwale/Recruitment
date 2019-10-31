<template>
  <div class="md-layout">
    <div class="md-layout-item md-small-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>mail_outline</md-icon>
          </div>
          <h4 class="title">Get Support</h4>
        </md-card-header>

        <md-card-content>
            <h4>What can we help you with?</h4>
          <md-field>
              <label for="select">Let us know what your issue is?</label>
                <md-select v-model="issue" name="select">
                    <md-option value="freelancer">Freelancer</md-option>
                    <md-option value="bug">Bug</md-option>
                </md-select>
          </md-field>
          <md-field>
            <label>Tell us more</label>
            <md-textarea v-model="description" type="text"></md-textarea>
          </md-field>
        </md-card-content>

        <md-card-actions md-alignment="left">
          <md-button class="md-success">Submit</md-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      issue: null,
      description: null
    };
  }
};
</script>
<style lang="scss" scoped>
.md-card .md-card-actions {
  border: none;
}
</style>
