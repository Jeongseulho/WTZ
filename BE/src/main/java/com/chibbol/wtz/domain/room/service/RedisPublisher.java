package com.chibbol.wtz.domain.room.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisPublisher {
    private final RedisTemplate<String, Object> stompRedisTemplate;

    public void publish(ChannelTopic topic, Object data) {
        // 메세지를 redis topic에 발행
        stompRedisTemplate.convertAndSend(topic.getTopic(), data);
    }

}
