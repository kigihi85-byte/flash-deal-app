package com.flashdeal.controller;

import com.flashdeal.dto.LoginRequest;
import com.flashdeal.dto.RegisterRequest;
import com.flashdeal.entity.User;
import com.flashdeal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Optional<User> userOpt = userService.findByEmail(loginRequest.getEmail());
            
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "이메일 또는 비밀번호가 올바르지 않습니다"));
            }

            User user = userOpt.get();
            
                if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "이메일 또는 비밀번호가 올바르지 않습니다"));
            }

            if (!user.getEnabled()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "계정이 비활성화되었습니다"));
            }

            // JWT 토큰 생성 (간단한 구현)
            String token = "jwt_token_" + user.getId();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("token", token);
            response.put("user", Map.of(
                "id", user.getId().toString(),
                "email", user.getEmail(),
                "fullName", user.getFullName(),
                "role", user.getRoleString()
            ));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("success", false, "message", "로그인 중 오류가 발생했습니다"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            // 이메일 중복 체크
            if (userService.findByEmail(registerRequest.getEmail()).isPresent()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "이미 사용 중인 이메일입니다"));
            }

            User user = new User();
            user.setEmail(registerRequest.getEmail());
                user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            user.setFullName(registerRequest.getFullName());
            user.setPhoneNumber(registerRequest.getPhoneNumber());
            user.setUsername(registerRequest.getEmail()); // 임시로 이메일을 username으로 사용
            user.setRole(User.UserRole.USER);
            user.setEnabled(true);

            User savedUser = userService.save(user);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "회원가입이 완료되었습니다");
            response.put("user", Map.of(
                "id", savedUser.getId().toString(),
                "email", savedUser.getEmail(),
                "fullName", savedUser.getFullName()
            ));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("success", false, "message", "회원가입 중 오류가 발생했습니다"));
        }
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestParam String email) {
        try {
            boolean available = userService.findByEmail(email).isEmpty();
            return ResponseEntity.ok(Map.of("available", available));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("available", true));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "인증 토큰이 필요합니다"));
            }

            String token = authHeader.substring(7);
            // 간단한 토큰 검증 (실제로는 JWT 검증 필요)
            if (!token.startsWith("jwt_token_")) {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "유효하지 않은 토큰입니다"));
            }

            String userId = token.substring(10);
            Optional<User> userOpt = userService.findByEmail(userId);
            
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "사용자를 찾을 수 없습니다"));
            }

            User user = userOpt.get();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("user", Map.of(
                "id", user.getId().toString(),
                "email", user.getEmail(),
                "fullName", user.getFullName(),
                "role", user.getRoleString()
            ));

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("success", false, "message", "사용자 정보를 가져오는 중 오류가 발생했습니다"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(Map.of("success", true, "message", "로그아웃되었습니다"));
    }
}
