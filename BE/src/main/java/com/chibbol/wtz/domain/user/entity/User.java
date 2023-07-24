package com.chibbol.wtz.domain.user.entity;


//import com.chibbol.wtz.domain.BaseTimeEntity;
import java.time.LocalDateTime;
import javax.persistence.*;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Getter
@NoArgsConstructor
@DynamicInsert
public class User {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long seq;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column
    private String refreshToken;

    @Column
    private Boolean isDeleted;

    @Column
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updateAt;


    @Builder
    public User(String email, String password, String nickname, Role role, Boolean isDeleted, String refreshToken) {
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.role = role;
        this.isDeleted = isDeleted;
        this.refreshToken = refreshToken;
        this.createdAt = LocalDateTime.now();
        this.updateAt = LocalDateTime.now();
    }

    public User update(User user) {
        if (user.email != null)
            this.email = user.email;
        if (user.nickname != null)
            this.nickname = user.nickname;
        if (user.password != null)
            this.password = user.password;
        if (user.isDeleted != null)
            this.isDeleted = user.isDeleted;
        if(user.role != null)
            this.role = user.role;
        if (user.refreshToken != null)
            this.refreshToken = user.refreshToken;
        this.updateAt = LocalDateTime.now();
        return this;
    }

    public void updateRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
