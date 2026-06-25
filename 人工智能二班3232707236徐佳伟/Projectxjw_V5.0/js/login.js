/**
 * 登录注册模块
 * 功能：用户登录、注册、表单校验、本地存储
 */

// ========== 用户数据存储 ==========

/**
 * 获取已注册用户列表
 * @returns {Array} 用户数组
 */
function getUsers() {
    var data = localStorage.getItem('registeredUsers');
    return data ? JSON.parse(data) : [];
}

/**
 * 保存用户列表到本地存储
 * @param {Array} users - 用户数组
 */
function saveUsers(users) {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

/**
 * 获取当前登录用户
 * @returns {Object|null} 当前用户对象或null
 */
function getCurrentUser() {
    var data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
}

/**
 * 保存当前登录用户
 * @param {Object} user - 用户对象
 */
function saveCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

// ========== 登录相关函数 ==========

/**
 * 显示登录弹窗
 */
function showLoginModal() {
    document.getElementById('loginModal').classList.add('show');
    document.getElementById('loginUsername').focus();
}

/**
 * 关闭登录弹窗
 */
function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('show');
    clearLoginForm();
}

/**
 * 清空登录表单
 */
function clearLoginForm() {
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('loginUsernameError').textContent = '';
    document.getElementById('loginPasswordError').textContent = '';
}

/**
 * 处理登录提交
 * @param {Event} e - 表单提交事件
 * @returns {boolean} false阻止默认提交
 */
function handleLogin(e) {
    e.preventDefault();

    var username = document.getElementById('loginUsername').value.trim();
    var password = document.getElementById('loginPassword').value;
    var usernameError = document.getElementById('loginUsernameError');
    var passwordError = document.getElementById('loginPasswordError');

    // 清空错误提示
    usernameError.textContent = '';
    passwordError.textContent = '';

    // 验证用户名
    if (!username) {
        usernameError.textContent = '请输入用户名';
        return false;
    }

    // 验证密码
    if (!password) {
        passwordError.textContent = '请输入密码';
        return false;
    }

    // 查找用户
    var users = getUsers();
    var foundUser = null;

    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            foundUser = users[i];
            break;
        }
    }

    if (foundUser) {
        // 登录成功
        saveCurrentUser(foundUser);
        closeLoginModal();
        updateLoginStatus();
        showToast('登录成功！欢迎回来，' + username, 'success');
    } else {
        // 登录失败
        passwordError.textContent = '用户名或密码错误';
    }

    return false;
}

// ========== 注册相关函数 ==========

/**
 * 显示注册弹窗
 */
function showRegisterModal() {
    document.getElementById('registerModal').classList.add('show');
    document.getElementById('regUsername').focus();
}

/**
 * 关闭注册弹窗
 */
function closeRegisterModal() {
    document.getElementById('registerModal').classList.remove('show');
    clearRegisterForm();
}

/**
 * 清空注册表单
 */
function clearRegisterForm() {
    document.getElementById('regUsername').value = '';
    document.getElementById('regPassword').value = '';
    document.getElementById('regConfirmPwd').value = '';
    document.getElementById('regUsernameError').textContent = '';
    document.getElementById('regUsernameSuccess').textContent = '';
    document.getElementById('regPasswordError').textContent = '';
    document.getElementById('regConfirmPwdError').textContent = '';
    document.getElementById('regConfirmPwdSuccess').textContent = '';
    document.getElementById('strengthBar').style.width = '0%';
    document.getElementById('strengthText').textContent = '';
}

/**
 * 切换到登录弹窗
 */
function switchToLogin() {
    closeRegisterModal();
    showLoginModal();
}

/**
 * 切换到注册弹窗
 */
function switchToRegister() {
    closeLoginModal();
    showRegisterModal();
}

/**
 * 校验用户名
 * 规则：6-20位，字母开头，只能包含字母、数字、下划线
 * @returns {boolean} 是否通过校验
 */
function validateUsername() {
    var username = document.getElementById('regUsername').value.trim();
    var errorEl = document.getElementById('regUsernameError');
    var successEl = document.getElementById('regUsernameSuccess');

    errorEl.textContent = '';
    successEl.textContent = '';

    if (!username) {
        errorEl.textContent = '请输入用户名';
        return false;
    }

    // 检查长度 (6-20位)
    if (username.length < 6) {
        errorEl.textContent = '用户名长度不能少于6位';
        return false;
    }
    if (username.length > 20) {
        errorEl.textContent = '用户名长度不能超过20位';
        return false;
    }

    // 检查是否以字母开头
    if (!/^[a-zA-Z]/.test(username)) {
        errorEl.textContent = '用户名必须以字母开头';
        return false;
    }

    // 检查是否只包含字母、数字、下划线
    if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(username)) {
        errorEl.textContent = '用户名只能包含字母、数字和下划线';
        return false;
    }

    // 检查用户名是否已存在
    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            errorEl.textContent = '该用户名已被注册';
            return false;
        }
    }

    successEl.textContent = '✓ 用户名可用';
    return true;
}

/**
 * 校验密码
 * 规则：8-20位，必须包含大写字母、小写字母、数字和特殊字符(#$@!*），不能有空格，不能包含用户名
 * @returns {boolean} 是否通过校验
 */
function validatePassword() {
    var password = document.getElementById('regPassword').value;
    var username = document.getElementById('regUsername').value.trim();
    var errorEl = document.getElementById('regPasswordError');
    var strengthBar = document.getElementById('strengthBar');
    var strengthText = document.getElementById('strengthText');

    errorEl.textContent = '';

    if (!password) {
        errorEl.textContent = '请输入密码';
        strengthBar.style.width = '0%';
        strengthText.textContent = '';
        return false;
    }

    // 检查是否包含空格
    if (/\s/.test(password)) {
        errorEl.textContent = '密码中不能包含空格';
        return false;
    }

    // 检查长度 (8-20位)
    if (password.length < 8) {
        errorEl.textContent = '密码长度不能少于8位';
        return false;
    }
    if (password.length > 20) {
        errorEl.textContent = '密码长度不能超过20位';
        return false;
    }

    // 检查是否包含用户名
    if (username && password.indexOf(username) !== -1) {
        errorEl.textContent = '密码中不能包含用户名';
        return false;
    }

    // 检查是否包含大写字母
    if (!/[A-Z]/.test(password)) {
        errorEl.textContent = '密码必须包含大写字母';
        return false;
    }

    // 检查是否包含小写字母
    if (!/[a-z]/.test(password)) {
        errorEl.textContent = '密码必须包含小写字母';
        return false;
    }

    // 检查是否包含数字
    if (!/[0-9]/.test(password)) {
        errorEl.textContent = '密码必须包含数字';
        return false;
    }

    // 检查是否包含特殊字符
    if (!/[#$@!*]/.test(password)) {
        errorEl.textContent = '密码必须包含特殊字符(#$@!*)';
        return false;
    }

    // 计算密码强度
    var strength = calculatePasswordStrength(password);
    updateStrengthDisplay(strength);

    return true;
}

/**
 * 计算密码强度
 * @param {string} password - 密码
 * @returns {number} 强度值 0-100
 */
function calculatePasswordStrength(password) {
    var score = 0;

    // 长度得分
    score += Math.min(password.length * 4, 32);

    // 包含大写字母
    if (/[A-Z]/.test(password)) score += 15;

    // 包含小写字母
    if (/[a-z]/.test(password)) score += 15;

    // 包含数字
    if (/[0-9]/.test(password)) score += 15;

    // 包含特殊字符
    if (/[#$@!*]/.test(password)) score += 23;

    return Math.min(score, 100);
}

/**
 * 更新密码强度显示
 * @param {number} strength - 强度值 0-100
 */
function updateStrengthDisplay(strength) {
    var strengthBar = document.getElementById('strengthBar');
    var strengthText = document.getElementById('strengthText');

    strengthBar.style.width = strength + '%';

    if (strength < 30) {
        strengthBar.style.backgroundColor = '#f56c6c';
        strengthText.textContent = '弱';
        strengthText.style.color = '#f56c6c';
    } else if (strength < 60) {
        strengthBar.style.backgroundColor = '#e6a23c';
        strengthText.textContent = '中';
        strengthText.style.color = '#e6a23c';
    } else if (strength < 80) {
        strengthBar.style.backgroundColor = '#409eff';
        strengthText.textContent = '强';
        strengthText.style.color = '#409eff';
    } else {
        strengthBar.style.backgroundColor = '#67c23a';
        strengthText.textContent = '非常强';
        strengthText.style.color = '#67c23a';
    }
}

/**
 * 校验确认密码
 * @returns {boolean} 是否通过校验
 */
function validateConfirmPassword() {
    var password = document.getElementById('regPassword').value;
    var confirmPassword = document.getElementById('regConfirmPwd').value;
    var errorEl = document.getElementById('regConfirmPwdError');
    var successEl = document.getElementById('regConfirmPwdSuccess');

    errorEl.textContent = '';
    successEl.textContent = '';

    if (!confirmPassword) {
        errorEl.textContent = '请再次输入密码';
        return false;
    }

    if (password !== confirmPassword) {
        errorEl.textContent = '两次输入的密码不一致';
        return false;
    }

    successEl.textContent = '✓ 密码一致';
    return true;
}

/**
 * 处理注册提交
 * @param {Event} e - 表单提交事件
 * @returns {boolean} false阻止默认提交
 */
function handleRegister(e) {
    e.preventDefault();

    // 执行所有校验
    var isUsernameValid = validateUsername();
    var isPasswordValid = validatePassword();
    var isConfirmValid = validateConfirmPassword();

    // 如果有校验不通过，阻止提交
    if (!isUsernameValid || !isPasswordValid || !isConfirmValid) {
        return false;
    }

    var username = document.getElementById('regUsername').value.trim();
    var password = document.getElementById('regPassword').value;

    // 创建用户对象
    var newUser = {
        username: username,
        password: password,
        createTime: new Date().toISOString()
    };

    // 保存用户
    var users = getUsers();
    users.push(newUser);
    saveUsers(users);

    // 注册成功提示
    closeRegisterModal();
    showToast('注册成功！请登录', 'success');

    // 自动打开登录弹窗
    setTimeout(function() {
        showLoginModal();
        document.getElementById('loginUsername').value = username;
    }, 1000);

    return false;
}

// ========== 登录状态管理 ==========

/**
 * 检查登录状态
 */
function checkLoginStatus() {
    var currentUser = getCurrentUser();
    if (currentUser) {
        updateLoginStatus();
    }
}

/**
 * 更新登录状态显示
 */
function updateLoginStatus() {
    var currentUser = getCurrentUser();
    var loginBtn = document.getElementById('loginBtn');
    var registerBtn = document.getElementById('registerBtn');
    var logoutBtn = document.getElementById('logoutBtn');
    var welcomeMsg = document.getElementById('welcome-msg');

    if (currentUser) {
        // 已登录
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        welcomeMsg.textContent = '欢迎，' + currentUser.username;
    } else {
        // 未登录
        loginBtn.style.display = 'inline-block';
        registerBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        welcomeMsg.textContent = '';
    }
}

/**
 * 退出登录
 */
function logout() {
    localStorage.removeItem('currentUser');
    updateLoginStatus();
    showToast('已退出登录', 'info');
}

// ========== 提示弹窗 ==========

/**
 * 显示提示弹窗
 * @param {string} message - 提示信息
 * @param {string} type - 提示类型：success/error/info
 */
function showToast(message, type) {
    var container = document.getElementById('toastContainer');

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + (type || 'info');

    var icon = '✓';
    if (type === 'error') icon = '✕';
    if (type === 'info') icon = 'ℹ';

    toast.innerHTML = '<span class="toast-icon">' + icon + '</span>' +
                      '<span class="toast-message">' + message + '</span>';

    container.appendChild(toast);

    // 添加显示动画
    setTimeout(function() {
        toast.classList.add('show');
    }, 10);

    // 3秒后自动消失
    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() {
            if (toast.parentNode) {
                container.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// ========== 点击遮罩层关闭弹窗 ==========
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        if (e.target.id === 'loginModal') {
            closeLoginModal();
        } else if (e.target.id === 'registerModal') {
            closeRegisterModal();
        }
    }
});
