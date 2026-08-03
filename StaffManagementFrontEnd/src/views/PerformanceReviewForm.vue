  <template>
    <div v-if="isLoading" class="flex flex-col items-center justify-center min-h-[100vh] gap-4">
    <img 
      src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUyMWM3MnhnOGp4cHgwZ3YyemEwdzZieXUweDZyZHA4eTViNG9tam1ieCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/pY8jLmZw0ElqvVeRH4/200w.gif" 
      class="w-60 h-60"
    />
    <h1 class="text-lg font-semibold animate-pulse">Loading...</h1>
  </div>
    <div v-else class="max-w-md mx-auto p-6 bg-white text-black shadow-md rounded-xl mt-8">
      <h1 class="text-2xl font-bold mb-4">
        {{ isEdit ? 'Edit Performance Review' : 'Create New Performance Review' }}
      </h1>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block font-medium mb-1">Performance Review ID</label>
          <input type="text" v-model="performanceReview.reviewID" disabled class="w-full border rounded px-3 py-2">
        </div>
        <div class="mb-4" v-if="!isEdit">
          <label class="block font-medium mb-1">Review Date</label>
          <input type="date" v-model="performanceReview.reviewDate" class="w-full border rounded px-3 py-2">
        </div>
        <div class="mb-4">
          <label class="block font-medium mb-1">Rating</label>
          <input v-model="performanceReview.rating" type="number" class="w-full border rounded px-3 py-2" required />
        </div>
        <div class="mb-4">
          <label class="block font-medium mb-1">Comments</label>
          <input v-model="performanceReview.comments" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <div class="mb-4">
          <label class="block font-medium mb-1">Employee Name</label>
          <br>
          <select
            v-model="performanceReview.employeeName"
            class="w-full border rounded px-3 py-2"
            required
          >
            <option disabled value="">Select Employee</option>
            <option
              v-for="staff in staffs"
              :key="staff.employeeID"
              :value="`${staff.firstName} ${staff.lastName}`"
            >
              {{ staff.firstName }} {{ staff.lastName }}
            </option>
          </select>
        </div>
        <div class="mt-6 flex justify-between">
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {{ isEdit ? 'Update' : 'Create' }}
          </button>
          <router-link to="/performances" class="text-gray-600 hover:underline">
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </template>

  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useRoute, useRouter } from 'vue-router'
  import type { PerformanceReview } from '@/types/PerformanceReview'
  import type { Employee } from '@/types/Employee'
  import { PerformanceReviewAPI, EmployeeAPI } from '@/end points/EndPointLinks'

  export default defineComponent({
    setup() {
      const isLoading = ref(true)
      const performanceReview = ref<PerformanceReview>({
        reviewID: 0,
        reviewDate: "",
        rating: 0,
        comments: "",
        employeeID: 0,
        employeeName: ""
      });

//------Default Variable
      const staffs = ref<Employee[]>([])
      const isEdit = ref(false)
      const route = useRoute()
      const router = useRouter()
//------Default functions
      const fetchStaffs = async () => {
        const res = await axios.get<Employee[]>(EmployeeAPI)
        staffs.value = res.data
      }
      //Search for Staff ID by Name
      const getEmployeeIDByName = (name: string): number | 0 => {
        const staff = staffs.value.find(s => {
          const fullName = `${s.firstName} ${s.lastName}`.toLowerCase()
          return fullName === name.toLowerCase()
        })
        return staff ? staff.employeeID : 0
      }
/////Core fuction related to this actions
      const fetchPerformanceReviewByID = async (id: number) => {
        const res = await axios.get<PerformanceReview>(`${PerformanceReviewAPI}/${id}`)
        performanceReview.value = {
          ...res.data,
          reviewDate: res.data.reviewDate.split('T')[0],
        }
      }

      const handleSubmit = async () => {
        try {
          const payload1 = {
            reviewDate: performanceReview.value.reviewDate,
            rating: performanceReview.value.rating,
            comments: performanceReview.value.comments,
            employeeID: getEmployeeIDByName(performanceReview.value.employeeName)
          }
          const payload2 = {
            rating: performanceReview.value.rating,
            comments: performanceReview.value.comments,
            employeeID: getEmployeeIDByName(performanceReview.value.employeeName)
          }
          if (isEdit.value) {
            await axios.put(`${PerformanceReviewAPI}/${performanceReview.value.reviewID}`, payload2)
          } else {
            await axios.post(PerformanceReviewAPI, payload1)
          }

          router.push('/performances')
        } catch (err) {
          console.error(err)
          alert('Error occurred: ' + err)
        }
      }
      onMounted(async () => {
        try{
          await fetchStaffs()
          const id = Number(route.params.id)
          if (!isNaN(id) && id > 0) {
            isEdit.value = true
            await fetchPerformanceReviewByID(id)
          }
        }finally{
          isLoading.value = false;
        }
      })

      return {
        isLoading,
        performanceReview,
        isEdit,
        staffs,
        handleSubmit
      }
    },
  })
  </script>