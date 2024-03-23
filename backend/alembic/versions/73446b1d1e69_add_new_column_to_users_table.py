"""add_new_column_to_users_table

Revision ID: 73446b1d1e69
Revises: abf9eda831f9
Create Date: 2023-12-05 16:58:17.373201

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import uuid
from datetime import datetime

# revision identifiers, used by Alembic.
revision: str = "73446b1d1e69"
down_revision: Union[str, None] = "abf9eda831f9"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("users", sa.Column("role", sa.String(50), nullable=False))
    op.add_column("users", sa.Column("birth_date", sa.Date, nullable=True))
    op.add_column("users", sa.Column("first_name", sa.String(256), nullable=True))
    op.add_column("users", sa.Column("last_name", sa.String(256), nullable=True))
    op.add_column("users", sa.Column("phone", sa.String(50), nullable=True))
    op.add_column("users", sa.Column("address", sa.String(550), nullable=True))
    op.add_column("users", sa.Column("is_verified", sa.Boolean(), nullable=True))
    op.add_column("users", sa.Column("verify_token", sa.String(36), nullable=True))
    op.add_column(
        "users", sa.Column("created_at", sa.Date, nullable=True, default=datetime.now())
    )
    op.alter_column(
        "users",
        "id",
        nullable=False,
        existing_type=sa.String(36),
        existing_nullable=False,
    )
    op.alter_column(
        "users",
        "email",
        nullable=False,
        existing_type=sa.String(256),
        existing_nullable=False,
    )
    op.alter_column(
        "users",
        "hashed_password",
        nullable=False,
        new_column_name="password",
        existing_type=sa.String(256),
        existing_nullable=False,
    )
    op.alter_column(
        "users", "is_active", existing_type=sa.Boolean(), existing_nullable=True
    )

def downgrade() -> None:
    pass
