import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage';
import TeacherLogin from './Components/TeacherLogin/TeacherLogin';
import StudentLogin from './Components/StudentLogin/StudentLogin';
import Signup from './Components/Signup/Signup';
import TeacherSignup from './Components/Signup/TeacherSignup/TeacherSignup';
import StudentSignup from './Components/Signup/StudentSignup/StudentSignup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login/teacher" element={<TeacherLogin />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/teacher" element={<TeacherSignup />} />
        <Route path="/signup/student" element={<StudentSignup />} />
        

      </Routes>
    </Router>
  );
}

export default App;
