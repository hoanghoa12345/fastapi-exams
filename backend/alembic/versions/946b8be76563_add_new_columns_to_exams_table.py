"""add_new_columns_to_exams_table

Revision ID: 946b8be76563
Revises: 73446b1d1e69
Create Date: 2024-02-24 09:05:44.586799

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '946b8be76563'
down_revision: Union[str, None] = '73446b1d1e69'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('exams', sa.Column('type', sa.String(length=100), nullable=True))
    op.add_column('exams', sa.Column('date', sa.DateTime(), nullable=True))
    op.add_column('exams', sa.Column('duration', sa.Integer(), nullable=True))
    op.add_column('exams', sa.Column('thumbnail_path', sa.String(length=1000), nullable=True))
    op.add_column('exams', sa.Column('description', sa.Text(), nullable=True))
    op.add_column('exams', sa.Column('is_published', sa.Boolean(), default=False))
    op.add_column('exams', sa.Column('display_order', sa.Integer(), default=0))


def downgrade() -> None:
    op.drop_column('exams', 'type')
    op.drop_column('exams', 'date')
    op.drop_column('exams', 'duration')
    op.drop_column('exams', 'thumbnail_path')
    op.drop_column('exams', 'description')
    op.drop_column('exams', 'is_published')
