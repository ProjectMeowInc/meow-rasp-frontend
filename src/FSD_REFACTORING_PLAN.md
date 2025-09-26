# План рефакторинга под FSD архитектуру

## Текущая структура (проблемы):

- `_pages/` - нарушение FSD, должно быть в `app/`
- Смешаны компоненты разных слоев в dashboard
- Неполная реализация entities и features

## Целевая FSD структура:

### 1. App Layer (Next.js App Router)

```
app/
  (main)/
    dashboard/
      classrooms/page.tsx
      corpuses/page.tsx
      groups/page.tsx
      teachers/page.tsx
      group-schedule/[id]/page.tsx
    groups/page.tsx
    login/page.tsx
    page.tsx
```

### 2. Pages Layer (удалить \_pages)

- Все страницы переносятся в app/
- \_pages/ полностью удаляется

### 3. Widgets Layer

```
widgets/
  dashboard/
    classroom-list/
    corpus-list/
    group-list/
    teacher-list/
    schedule-view/
    set-lesson-form/
```

### 4. Features Layer

```
features/
  classroom/
    create-classroom/
    edit-classroom/
    select-classroom/
  teacher/
    create-teacher/
    select-teacher/
  group/
    create-group/
    edit-group/
    schedule-group/
  lesson/
    create-lesson/
    edit-lesson/
```

### 5. Entities Layer (уже хорошая структура)

```
entities/
  classroom/
  teacher/
  group/
  lesson/
  discipline/
```

### 6. Shared Layer

```
shared/
  ui/ (компоненты)
  lib/ (утилиты)
  api/ (HTTP клиент)
  config/ (конфигурации)
```

## Шаги рефакторинга:

1. ✅ Проанализировать текущую структуру
2. ✅ Создать план FSD структуры
3. Переместить страницы из \_pages/ в app/
4. Реорганизовать features согласно FSD
5. Обновить все импорты
6. Протестировать сборку и функциональность

## Принципы:

- Верхние слои могут зависеть от нижних, но не наоборот
- App → Pages → Widgets → Features → Entities → Shared
- Каждый слой имеет четкую ответственность
