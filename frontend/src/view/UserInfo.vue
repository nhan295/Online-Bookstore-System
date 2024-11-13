<template>
  <div class="user-profile">
    <div class="user-avatar" v-if="userAvatar">
      <img :src="userAvatar" alt="User Avatar" />
    </div>
    <div class="user-details">
      <h2>{{ userName }}</h2>

      <div class="input-group">
        <i class="fas fa-envelope"></i>
        <input type="text" v-model="userEmail" disabled />
      </div>

      <div class="input-group">
        <i class="fas fa-map-marker-alt"></i>
        <input type="text" v-model="userAddress" disabled/>
      </div>

      <div class="input-group">
        <i class="fas fa-calendar-alt"></i>
        <input type="text" v-model="userDate" disabled />
      </div>
    </div>

    <form id="change-password-form" @submit.prevent="changePassword">
        <div class="user-details">
          <h2>Change Password</h2>

          <div class="input-group">
            <input type="password" placeholder="Current password" v-model="currentPassword"/>
          </div>

          <div class="input-group">
            <input type="password" placeholder="New password" v-model="newPassword"/>
          </div>

          <div class="input-group">
            <input type="password" placeholder="Confirm password" v-model="confirmPassword"/>
          </div>
        </div>

        <div class="button-group">
          <button type="submit">Change Password</button>
        </div>
      </form>
  
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const userAvatar = ref(null);
const userName = ref(null);
const userEmail = ref(null);
const userAddress = ref(null);
const userDate = ref(null);

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const getUserData = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/users/", {
      method: 'GET',
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
      userAvatar.value = data.user.user_avatar;
      userName.value = data.user.user_name;
      userEmail.value = data.user.user_email;
      userAddress.value = data.user.user_address;
      userDate.value = data.user.date_created;
    }
  } catch (error) {
    console.error('Failed to fetch user data', error);
  }
};

const changePassword = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/users/changePassword", {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: currentPassword.value,
          newPassword: newPassword.value,
          confirmPassword: confirmPassword.value,
        }),
      });
      console.log(response.json())
      if (response.ok) {
        alert('Password changed successfully');
      } else {
        alert('Failed to change password');
      }
    } catch (error) {
      console.error('Failed to change password', error);
    }
  }

onMounted(() => {
  getUserData();
});
</script>

<style scoped>
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: auto;
  padding: 30px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  transition: box-shadow 0.3s ease;
}

.user-profile:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.user-avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.user-avatar img:hover {
  transform: scale(1.05);
}

.user-details h2 {
  margin: 10px 0;
  font-size: 1.8em;
  color: #333;
  font-weight: 600;
}

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
}

.input-group span {
  width: 30%;
  color: #666;
  font-size: 0.95em;
  font-weight: 500;
}

.input-group input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1em;
  color: #333;
  background-color: #f7f7f7;
  transition: border-color 0.3s ease;
}

.input-group input:focus {
  border-color: #007bff;
  outline: none;
}

.field-input {
  margin-bottom: 15px;
}

.profile-btn {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.save-btn {
  padding: 12px 25px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.save-btn:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.ok-message, .error-message {
  display: block;
  text-align: center;
  margin-top: 10px;
  font-size: 0.9em;
  font-weight: 500;
}

.ok-message {
  color: #28a745;
}

.error-message {
  color: #dc3545;
}
</style>

