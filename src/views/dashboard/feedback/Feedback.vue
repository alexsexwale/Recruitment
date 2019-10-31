<template>
  <div class="md-layout">
    <div class="md-layout-item md-small-size-100">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>mail_outline</md-icon>
          </div>
          <h4 class="title">Give Feedback</h4>
        </md-card-header>

        <md-card-content>
            <h4>Pop us a message</h4>
          <md-field>
              <label for="select">What is your message about?</label>
                <md-select v-model="message" name="select">
                    <md-option value="feature">Feature suggestion</md-option>
                    <md-option value="chat">I'd just like to chat</md-option>
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
      message: null,
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
