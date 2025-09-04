package com.aggiovato.teamchecklist.checklist.domain;

import jakarta.persistence.*;
import lombok.Getter; import lombok.Setter;
import java.time.Instant;

@Entity
@Table(name = "items",
        indexes = {
                @Index(name = "idx_item_checklist", columnList = "checklist_id"),
                @Index(name = "idx_item_checklist_done", columnList = "checklist_id,done")
        })
@Getter @Setter
public class Item {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "checklist_id", nullable = false)
    private Checklist checklist;

    @Column(nullable = false, length = 240)
    private String text;

    @Column(nullable = false)
    private boolean done = false;

    @Column(length = 60)
    private String lastEditedBy;

    @Column(nullable = false)
    private Instant updatedAt = Instant.now();

    @PrePersist @PreUpdate
    void touch() { this.updatedAt = Instant.now(); }
}
