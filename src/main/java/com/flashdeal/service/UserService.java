package com.flashdeal.service;

import com.flashdeal.dto.LoginRequest;
import com.flashdeal.dto.RegisterRequest;
import com.flashdeal.entity.User;
import com.flashdeal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Transactional
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public User register(RegisterRequest request) {
        // 이메일 중복 확인
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }
        
        // 비밀번호 해싱 (실제로는 BCrypt 등을 사용해야 함)
        String hashedPassword = hashPassword(request.getPassword());
        
        User user = new User(
            request.getEmail(),
            hashedPassword,
            request.getName(),
            request.getPhone()
        );
        
        return userRepository.save(user);
    }
    
    public User login(LoginRequest request) {
        User user = userRepository.findByEmailAndIsActiveTrue(request.getEmail())
            .orElseThrow(() -> new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다."));
        
        // 비밀번호 확인 (실제로는 BCrypt 등을 사용해야 함)
        if (!user.getPassword().equals(hashPassword(request.getPassword()))) {
            throw new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
        
        return user;
    }
    
    public User getUserById(UUID id) {
        return userRepository.findById(id).orElse(null);
    }
    
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
    
    private String hashPassword(String password) {
        // 실제로는 BCrypt 등을 사용해야 함
        // 여기서는 간단한 해싱으로 대체
        return String.valueOf(password.hashCode());
    }
}
